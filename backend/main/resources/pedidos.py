from flask_restful import Resource
from flask import request
from main.models import AnimalModel
from .. import db


PEDIDOS = {
    1: {"producto_id": 1, "nombre": "Hamburguesa", "precio": 10000, "cantidad": 2},
    2: {"producto_id": 2, "nombre": "Pizza", "precio": 7000, "cantidad": 3}
}

def verificar_permiso(roles_requeridos):
    rol_usuario = request.headers.get('Rol', '')  # Obtiene el rol desde los headers
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


    #def get(self, id):
    #   permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
    #   if not permitido:
    #       return mensaje, codigo
        
    #   return PEDIDOS.get(int(id), ('El id es inexistente', 404))
    
    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in PEDIDOS:
            data = request.get_json()
            PEDIDOS[int(id)].update(data)
            return 'Pedido modificado con éxito', 201
        return 'El id que intentas modificar es inexistente', 404
    
    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in PEDIDOS:
            del PEDIDOS[int(id)]
            return 'Pedido eliminado con éxito', 200
        return 'El id a eliminar es inexistente', 404

class Pedidos(Resource):

    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        return PEDIDOS
    
    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        id = int(max(PEDIDOS.keys())) + 1 if PEDIDOS else 1
        PEDIDOS[id] = data
        return PEDIDOS[id], 201
