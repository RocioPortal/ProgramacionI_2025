from flask_restful import Resource
from flask import request
from main.models import UsuarioModel
from .. import db
import re


def verificar_permiso(roles_requeridos):
    rol_usuario = 'ADMIN'  
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200


class Usuario(Resource):
    def get(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        usuario = db.session.query(UsuarioModel).get(id_user)
        if usuario:
            return usuario.to_json_complete(), 200
        return 'El id es inexistente', 404

    def put(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        usuario = db.session.query(UsuarioModel).get(id_user)
        if not usuario:
            return 'El id que intentan editar es inexistente', 404

        data = request.get_json()


        # Validación del correo electrónico
        if 'email' in data:
            email = data['email']
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"message": "El correo electrónico no es válido"}, 400


        if 'estado' in data and data['estado'] == 'activo':
            if usuario.estado == 'suspendido':
                usuario.estado = 'activo'
                db.session.commit()
                return 'Usuario reactivado con éxito', 200
            return 'El usuario ya está activo', 200

        if 'nombre' in data:
            usuario.nombre = data['nombre']
        if 'rol' in data:
            usuario.rol = data['rol']
        if 'estado' in data:
            usuario.estado = data['estado']
        if 'email' in data:
            usuario.email = data['email']
        if 'telefono' in data:
            usuario.telefono = data['telefono']

        db.session.commit()
        return 'Usuario editado con éxito', 200

    def delete(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        usuario = db.session.query(UsuarioModel).get(id_user)
        if not usuario:
            return 'El id a eliminar es inexistente', 404

        usuario.estado = 'suspendido'
        db.session.commit()

        return {
            "id_user": usuario.id_user,
            "nombre": usuario.nombre,
            "rol": usuario.rol,
            "estado": 'suspendido',
            "email": usuario.email,
            "telefono": usuario.telefono
        }, 200


class Usuarios(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        usuarios = db.session.query(UsuarioModel).all()
        return [usuario.to_json_complete() for usuario in usuarios], 200

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        data = request.get_json()

        # Validación del correo electrónico
        if 'email' in data:
            email = data['email']
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"message": "El correo electrónico no es válido"}, 400
            
        nuevo_usuario = UsuarioModel(
            nombre=data.get('nombre'),
            rol=data.get('rol'),
            estado=data.get('estado', 'activo'),
            email=data.get('email'),
            telefono=data.get('telefono')
        )
        db.session.add(nuevo_usuario)
        db.session.commit()

        return nuevo_usuario.to_json(), 201