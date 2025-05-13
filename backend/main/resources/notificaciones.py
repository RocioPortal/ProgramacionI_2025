from flask_restful import Resource
from flask import request
from main.models import NotificacionesModel
from main import db

def verificar_permiso(roles_requeridos):
    rol_usuario = request.headers.get('ROL',"") 
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200


class Notificacion(Resource):
    def post(self, usuario_id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        if 'mensaje' not in data:
            return "Debes proporcionar un mensaje para la notificación", 400
        
        nueva_notificacion = NotificacionesModel(
            id_user=usuario_id,
            mensaje=data['mensaje']
        )
         
        db.session.add(nueva_notificacion)
        db.session.commit()
        
        return nueva_notificacion.to_json(), 201