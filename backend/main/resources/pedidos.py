from flask_restful import Resource
from flask import request
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

        pedidos = PedidoModel.query.all()
        if not pedidos:
            return {"mensaje": "No hay pedidos en la base de datos"}, 404

        return [pedido.to_json() for pedido in pedidos], 200

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        data = request.get_json()

        productos = data.get('productos', [])  
        if not data.get('id_user'):
            return {"mensaje": "El campo 'id_user' es obligatorio"}, 400
        if not productos:
            return {"mensaje": "Debes incluir productos en el pedido"}, 400

        nuevo_pedido = PedidoModel(
            id_user=data['id_user'],
            nombre=data.get('nombre', ''),
            estado=data.get('estado', 'pendiente')
        )
        db.session.add(nuevo_pedido)
        db.session.flush()  

        for prod in productos:
            id_prod = prod.get('id_prod')
            cantidad = prod.get('cantidad', 1)
            producto = db.session.get(ProductoModel, id_prod)

            if not producto:
                db.session.rollback()
                return {"mensaje": f"Producto con ID {id_prod} no encontrado"}, 404

            orden = Orden(
                id_pedido=nuevo_pedido.id_pedido,
                id_prod=id_prod,
                cantidad=cantidad,
                precio_total=producto.precio * cantidad
            )
            db.session.add(orden)

        db.session.commit()

        return {
            "mensaje": "Pedido creado con éxito",
            "pedido": nuevo_pedido.to_json_complete()
        }, 201