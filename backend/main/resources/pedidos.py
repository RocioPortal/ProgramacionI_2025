from flask_restful import Resource
from flask import request
from main.models import PedidoModel
from .. import db


#PEDIDOS = {
#    1: {"producto_id": 1, "nombre": "Hamburguesa", "precio": 10000, "cantidad": 2},
#    2: {"producto_id": 2, "nombre": "Pizza", "precio": 7000, "cantidad": 3}
#}


def verificar_permiso(roles_requeridos):
    rol_usuario = request.headers.get('Rol', '')  
    print(f"Rol recibido en la petición: {rol_usuario}")

    if rol_usuario not in roles_requeridos:
        print(f"Acceso denegado: {rol_usuario} no está en {roles_requeridos}")  
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200


class Pedido(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        pedido = db.session.query(PedidoModel).get_or_404(id)
        return pedido.to_json()

    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        pedido = db.session.query(PedidoModel).get_or_404(id)
        data = request.get_json()

        pedido.nombre = data.get('nombre', pedido.nombre)
        pedido.precio = data.get('precio', pedido.precio)
        pedido.estado = data.get('estado', pedido.estado)

        db.session.commit()
        return pedido.to_json(), 200

    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        pedido = db.session.query(PedidoModel).get_or_404(id)
        db.session.delete(pedido)
        db.session.commit()
        return {'mensaje': 'Pedido eliminado con éxito'}, 200


class Pedidos(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        pedidos = db.session.query(PedidoModel).all()
        return [pedido.to_json() for pedido in pedidos], 200

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        data = request.get_json()
        nuevo_pedido = PedidoModel(
            nombre=data.get('nombre'),
            precio=data.get('precio'),
            estado=data.get('estado', 'pendiente')
        )
        db.session.add(nuevo_pedido)
        db.session.commit()
        return nuevo_pedido.to_json(), 201
