from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from main.models import PedidoModel, OrdenModel, ProductoModel
from .. import db
from main.auth.decorators import role_required

class Pedido(Resource):
    @jwt_required()
    @role_required(['USER', 'ADMIN', 'EMPLEADO'])
    def get(self, id):
        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404
        return pedido.to_json_complete(), 200

    @jwt_required()
    @role_required(['ADMIN', 'EMPLEADO'])
    def delete(self, id):
        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        db.session.delete(pedido)
        db.session.commit()
        return {"mensaje": f"Pedido con ID {id} eliminado con éxito"}, 200

    @jwt_required()
    @role_required(['USER', 'ADMIN', 'EMPLEADO'])
    def put(self, id):
        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        data = request.get_json()
        pedido.nombre = data.get('nombre', pedido.nombre)
        
        # --- NOVEDAD 1: ACTUALIZAR ESPECIFICACIONES (NOTAS) ---
        # Recibimos la lista de órdenes desde Angular y actualizamos una por una
        ordenes_data = data.get('ordenes')
        if ordenes_data:
            for ord_data in ordenes_data:
                id_orden = ord_data.get('id_orden')
                if id_orden:
                    orden_db = db.session.get(OrdenModel, id_orden)
                    # Verificamos que la orden exista y pertenezca a este pedido por seguridad
                    if orden_db and orden_db.id_pedido == pedido.id_pedido:
                        orden_db.especificaciones = ord_data.get('especificaciones', orden_db.especificaciones)
        # ------------------------------------------------------

        nuevo_estado = data.get('estado')
        
        if nuevo_estado and nuevo_estado != pedido.estado:
            estados_permitidos = ['pendiente', 'en preparación', 'listo para retiro', 'entregado', 'cancelado']
            if nuevo_estado not in estados_permitidos:
                return {"mensaje": f"Estado inválido. Los estados permitidos son: {estados_permitidos}"}, 400
            
            pedido.estado = nuevo_estado

            from main.models import UsuarioModel
            from main.mail.functions import sendMail
            from main.models.notificaciones import Notificacion # Importamos tu modelo

            # --- NOVEDAD 2: CREAR NOTIFICACIÓN EN LA BASE DE DATOS ---
            nueva_notificacion = Notificacion(
                id_user=pedido.id_user,
                mensaje=f"Tu pedido #{pedido.id_pedido} ahora se encuentra en estado: {nuevo_estado.upper()}"
            )
            db.session.add(nueva_notificacion)
            # ---------------------------------------------------------

            cliente = db.session.get(UsuarioModel, pedido.id_user)
            if cliente and cliente.email:
                try:
                    sendMail(
                        to=[cliente.email],
                        subject=f"Actualización de tu pedido #{pedido.id_pedido}",
                        template='estado_mail',
                        cliente=cliente.nombre,
                        pedido=pedido,
                        estado=nuevo_estado
                    )
                except Exception as e:
                    print(f"Error al enviar el mail: {e}")

        db.session.commit()

        return {
            "mensaje": f"Pedido con ID {id} actualizado con éxito",
            "pedido": pedido.to_json()
        }, 200


class Pedidos(Resource):
    @jwt_required()
    @role_required(['ADMIN', 'EMPLEADO', 'USER'])
    def get(self):
        from flask_jwt_extended import get_jwt_identity
        from main.models import UsuarioModel

        usuario_actual_id = get_jwt_identity()
        usuario_actual = db.session.get(UsuarioModel, usuario_actual_id)

        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        pedidos_query = db.session.query(PedidoModel)

        if usuario_actual and usuario_actual.rol == 'USER':
            pedidos_query = pedidos_query.filter(PedidoModel.id_user == int(usuario_actual_id))
        else:
            if request.args.get('id_user'):
                pedidos_query = pedidos_query.filter(PedidoModel.id_user == int(request.args.get('id_user')))

        estado = request.args.get('estado')
        if estado:
            pedidos_query = pedidos_query.filter(PedidoModel.estado.ilike(f"%{estado}%"))

        nombre = request.args.get('nombre')
        if nombre:
            pedidos_query = pedidos_query.filter(PedidoModel.nombre.ilike(f"%{nombre}%"))

        sort_applied = False 

        if request.args.get('sortby_estado'):
            pedidos_query = pedidos_query.order_by(PedidoModel.estado)
            sort_applied = True 
            
        if request.args.get('sortby_nombre'):
            pedidos_query = pedidos_query.order_by(PedidoModel.nombre)
            sort_applied = True 

        if not sort_applied:
            pedidos_query = pedidos_query.order_by(PedidoModel.id_pedido.desc())

        pedidos_paginados = pedidos_query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'pedidos': [pedido.to_json() for pedido in pedidos_paginados.items],
            'total': pedidos_paginados.total,
            'pages': pedidos_paginados.pages,
            'page': pedidos_paginados.page
        })

    @jwt_required()
    @role_required(['USER', 'ADMIN', 'EMPLEADO'])
    def post(self):
        data = request.get_json()

        productos = data.get('productos')
        if not data.get('id_user'):
            return {"mensaje": "El campo 'id_user' es obligatorio"}, 400

        try:
            nuevo_pedido = PedidoModel.from_json(data)
            db.session.add(nuevo_pedido)
            db.session.commit()  

            if productos:
                for prod in productos:
                    id_prod = prod.get('id_prod')
                    cantidad = prod.get('cantidad', 1)
                    producto = db.session.get(ProductoModel, id_prod)

                    if not producto:
                        db.session.rollback()
                        return {"mensaje": f"Producto con ID {id_prod} no encontrado"}, 404

                    descuento = getattr(producto, 'descuento', 0) or 0
                    precio_rebajado = producto.precio - (producto.precio * descuento / 100)
                    precio_final = precio_rebajado * cantidad

                    orden = OrdenModel(
                        id_pedido=nuevo_pedido.id_pedido,
                        id_prod=id_prod,
                        cantidad=cantidad,
                        especificaciones=prod.get("especificaciones", ""),
                        precio_total=precio_final
                    )
                    db.session.add(orden)

                db.session.commit()  

            db.session.expire(nuevo_pedido)
            pedido_final = db.session.get(PedidoModel, nuevo_pedido.id_pedido)

            return {
                "mensaje": "Pedido creado con éxito",
                "pedido": pedido_final.to_json_complete()
            }, 201

        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al crear el pedido: {str(e)}"}, 500