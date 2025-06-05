from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from main.models import PedidoModel, OrdenModel, ProductoModel
from .. import db
from main.auth.decorators import role_required

class Pedido(Resource):
    @jwt_required()
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def get(self, id):
        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404
        return pedido.to_json_complete(), 200

    @jwt_required()
    @role_required(['ADMIN'])
    def delete(self, id):
        pedido = db.session.get(PedidoModel, id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        db.session.delete(pedido)
        db.session.commit()
        return {"mensaje": f"Pedido con ID {id} eliminado con éxito"}, 200

    @jwt_required()
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def put(self, id):
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
    @jwt_required()
    @role_required(['ADMIN', 'ENCARGADO'])
    def get(self):
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        pedidos_query = db.session.query(PedidoModel)

        # Filtros
        estado = request.args.get('estado')
        if estado:
            pedidos_query = pedidos_query.filter(PedidoModel.estado.ilike(f"%{estado}%"))

        nombre = request.args.get('nombre')
        if nombre:
            pedidos_query = pedidos_query.filter(PedidoModel.nombre.ilike(f"%{nombre}%"))

        # Ordenamientos
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

    @jwt_required()
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def post(self):
        data = request.get_json()

        productos = data.get('productos')
        if not data.get('id_user'):
            return {"mensaje": "El campo 'id_user' es obligatorio"}, 400

        nuevo_pedido = PedidoModel.from_json(data)
        db.session.add(nuevo_pedido)
        db.session.flush()  # Para obtener el id generado

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
