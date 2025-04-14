from flask_restful import Resource
from flask import request
from main.models import ProductoModel
from .. import db

#PRODUCTOS = {
#    1: {'nombre': 'Hamburguesa', 'precio': 10000},
#    2: {'nombre': 'Pizza', 'precio': 7000}
#}


# Función para verificar permisos (puede estar mejor centralizada luego)
def verificar_permiso(roles_requeridos):
    rol_usuario = 'ADMIN'  # Cambiar esto según lógica real
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

class Producto(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        producto = db.session.get(ProductoModel, id)
        if producto:
            return producto.to_json(), 200
        return {'message': 'Producto no encontrado'}, 404

    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        producto = db.session.get(ProductoModel, id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        data = request.get_json()
        producto.nombre = data.get('nombre', producto.nombre)
        producto.descripcion = data.get('descripcion', producto.descripcion)
        producto.precio = data.get('precio', producto.precio)
        producto.disponible = data.get('disponible', producto.disponible)

        db.session.commit()
        return {'message': 'Producto actualizado con éxito'}, 200

    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        producto = db.session.get(ProductoModel, id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        db.session.delete(producto)
        db.session.commit()
        return {'message': 'Producto eliminado con éxito'}, 200

class Productos(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        productos = ProductoModel.query.all()
        return [p.to_json() for p in productos], 200

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        data = request.get_json()
        nuevo_producto = ProductoModel.from_json(data)
        db.session.add(nuevo_producto)
        db.session.commit()
        return nuevo_producto.to_json(), 201
