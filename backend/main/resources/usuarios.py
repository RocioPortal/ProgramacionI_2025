from flask_restful import Resource
from flask import request

USUARIOS = {
    1: {'nombre': 'Admin', 'rol': 'ADMIN', 'estado': 'activo'},
    2: {'nombre': 'Encargado1', 'rol': 'ENCARGADO', 'estado': 'activo'}
}

# Función para verificar permisos de acuerdo al rol
def verificar_permiso(roles_requeridos):
    rol_usuario = 'ADMIN'  #Esto hay que cambiar por la lógica para obtener el rol del usuario.
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

# Recurso para un usuario específico
class Usuario(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return 'El id es inexistente', 404
    
    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in USUARIOS:
            data = request.get_json()
            # Si el estado es 'suspendido', lo cambiamos a 'activo'
            if 'estado' in data and data['estado'] == 'activo':
                if USUARIOS[int(id)]['estado'] == 'suspendido':
                    USUARIOS[int(id)]['estado'] = 'activo'
                    return 'Usuario reactivado con éxito', 200
                return 'El usuario ya está activo', 400
            USUARIOS[int(id)].update(data)
            return 'Usuario editado con éxito', 201
        
        return 'El id que intentan editar es inexistente', 404
    
    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in USUARIOS:
            USUARIOS[int(id)]['estado'] = 'suspendido'  # Suspender usuario
            return 'Usuario suspendido con éxito', 200
        return 'El id a eliminar es inexistente', 404

# Recurso para la colección de usuarios
class Usuarios(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        return USUARIOS
    
    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        id = int(max(USUARIOS.keys())) + 1 if USUARIOS else 1
        USUARIOS[id] = data
        return USUARIOS[id], 201