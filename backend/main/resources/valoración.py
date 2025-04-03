from flask_restful import Resource
from flask import request

VALORACIONES = {}

def verificar_permiso(roles_requeridos):
    rol_usuario = 'USER'  
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

class Valoracion(Resource):
    def post(self, producto_id):
        permitido, mensaje, codigo = verificar_permiso(['USER'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        if 'calificacion' not in data or 'comentario' not in data:
            return "Debes proporcionar una calificación y un comentario", 400
        
        if not (1 <= data['calificacion'] <= 5):
            return "La calificación debe estar entre 1 y 5", 400
        
        if producto_id not in VALORACIONES:
            VALORACIONES[producto_id] = []
        
        VALORACIONES[producto_id].append({
            'calificacion': data['calificacion'],
            'comentario': data['comentario']
        })
        
        return {"mensaje": "Valoracion agregada exitosamente", "valoraciones": VALORACIONES}, 201

    def get(self, producto_id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        return VALORACIONES.get(producto_id, [])