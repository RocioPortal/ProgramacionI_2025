from flask_restful import Resource
from flask import request

USUARIOS = {
    1: {'nombre': 'Admin', 'rol': 'ADMIN'},
    2: {'nombre': 'Encargado1', 'rol': 'ENCARGADO'}
}

# Recurso para un usuario específico
class Usuario(Resource):
    def get(self, id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return 'El id es inexistente', 404
    
    def put(self, id):
        if int(id) in USUARIOS:
            data = request.get_json()
            USUARIOS[int(id)].update(data)
            return 'Usuario editado con éxito', 201
        return 'El id que intentan editar es inexistente', 404
    
    def delete(self, id):
        if int(id) in USUARIOS:
            USUARIOS[int(id)]['estado'] = 'suspendido'
            return 'Usuario suspendido con éxito', 204
        return 'El id a eliminar es inexistente', 404

# Recurso para la colección de usuarios
class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        data = request.get_json()
        id = int(max(USUARIOS.keys())) + 1 if USUARIOS else 1
        USUARIOS[id] = data
        return USUARIOS[id], 201
