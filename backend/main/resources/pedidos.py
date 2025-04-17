from flask_restful import Resource
from flask import request
from main.models import PedidoModel
from .. import db

# Función para verificar permisos
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
            return {"mensaje": mensaje}, codigo

        pedido = db.session.query(PedidoModel).get(id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404
        
        return pedido.to_json_complete(), 200


    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedido = db.session.query(PedidoModel).get(id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        db.session.delete(pedido)
        db.session.commit()
        return {"mensaje": f"Pedido con ID {id} eliminado con éxito"}, 200


    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedido = db.session.query(PedidoModel).get(id)
        if not pedido:
            return {"mensaje": f"No hay pedidos con el ID {id}"}, 404

        data = request.get_json().items()
        for key, value in data:
            setattr(pedido, key, value)
        db.session.commit()

        return {
            "mensaje": f"Pedido con ID {id} actualizado con éxito",
            "pedido": pedido.to_json()
        }, 201


class Pedidos(Resource):

    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        pedidos = db.session.query(PedidoModel).all()
        if not pedidos:
            return {"mensaje": "No hay pedidos en la base de datos"}, 404

        return [pedido.to_json() for pedido in pedidos], 200


    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return {"mensaje": mensaje}, codigo

        data = request.get_json()

        # Si no se envió el id_user, retornamos error
        if not data.get('id_user'):
            return {"mensaje": "El campo 'id_user' es obligatorio"}, 400

        nuevo_pedido = PedidoModel(
            id_user=data['id_user'],
            nombre=data.get('nombre'),
            precio=data.get('precio'),
            estado=data.get('estado', 'pendiente')
        )
