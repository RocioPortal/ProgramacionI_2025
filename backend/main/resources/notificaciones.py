from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from main.models import NotificacionesModel
from main import db
from main.auth.decorators import role_required

class Notificacion(Resource):
    @jwt_required()
    @role_required(['ADMIN', 'ENCARGADO'])
    def post(self, usuario_id):
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
