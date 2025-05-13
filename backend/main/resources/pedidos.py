from flask_restful import Resource
from flask import request, jsonify
from main.models import PedidoModel, OrdenModel, ProductoModel
from .. import db

def verificar_permiso(roles_requeridos):
    rol_usuario = request.headers.get('Rol', '')
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

class Pedido(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404
        
        return pedido.to_json_complete(), 200

    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        db.session.delete(pedido)
        db.session.commit()
        return {"mensaje": f"Pedido con ID {id} eliminado con éxito"}, 200

    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        data = request.get_json()
        pedido.nombre = data.get('nombre', pedido.nombre)
        pedido.estado = data.get('estado', pedido.estado)
        
        db.session.commit()

        return {
            "mensaje": f"Pedido con ID {id} actualizado con éxito",
            "pedido": pedido.to_json()
        }, 200


class Pedidos(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        pedidos_query = db.session.query(PedidoModel)
        #FILTROS
        estado = request.args.get('estado')
        if estado:
            pedidos_query = pedidos_query.filter(PedidoModel.estado.ilike(f"%{estado}%"))

        nombre = request.args.get('nombre')
        if nombre:
            pedidos_query = pedidos_query.filter(PedidoModel.nombre.ilike(f"%{nombre}%"))

        #ORDENAMIENTOS

        if request.args.get('sortby_estado'):
            pedidos_query = pedidos_query.order_by(PedidoModel.estado)

        if request.args.get('sortby_nombre'):
            pedidos_query = pedidos_query.order_by(PedidoModel.nombre)

        pedidos_paginados = pedidos_query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'pedidos': [pedido.to_json() for pedido in pedidos_paginados.items],
            'total': pedidos_paginados.total,
            'pages': pedidos_paginados.pages,
            'page': pedidos_paginados.page
        })

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        data = request.get_json()

        productos = data.get('productos')

        if not data.get('id_user'):
            return {"mensaje": "El campo 'id_user' es obligatorio"}, 400

        nuevo_pedido = PedidoModel.from_json(data)
        db.session.add(nuevo_pedido)
        db.session.flush()  

        if productos:
            for prod in productos:
                id_prod = prod.get('id_prod')
                cantidad = prod.get('cantidad', 1)
                producto = db.session.get(ProductoModel, id_prod)

                if not producto:
                    db.session.rollback()
                    return {"mensaje": f"Producto con ID {id_prod} no encontrado"}, 404

                orden = OrdenModel(
                    id_pedido=nuevo_pedido.id_pedido,
                    id_prod=id_prod,
                    cantidad=cantidad,
                    especificaciones=prod.get("especificaciones", ""),
                    precio_total=producto.precio * cantidad
                )
                db.session.add(orden)

        db.session.commit()

        return {
            "mensaje": "Pedido creado con éxito",
            "pedido": nuevo_pedido.to_json_complete()
        }, 201