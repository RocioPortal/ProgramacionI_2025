from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from main.models import NotificacionesModel
from main import db
from main.auth.decorators import role_required

class Notificacion(Resource):
    @jwt_required()                        ## Exige que haya un token de inicio de sesión válido.
    @role_required(['ADMIN', 'EMPLEADO'])  ## Verifica que el rol del usuario sea ADMIN o EMPLEADO.
    def post(self, usuario_id):      #Crear algo nuevo
        data = request.get_json()          # Atrapa el paquete que manda Angular
        
        if 'mensaje' not in data:          #VALIDACIÓN DE SEGURIDAD
            return "Debes proporcionar un mensaje para la notificación", 400
        
        nueva_notificacion = NotificacionesModel(        # Usa el traductor del modelo para armar la notificación en memoria, atándola al ID del usuario que vino por la URL.
            id_user=usuario_id,
            mensaje=data['mensaje']
        )
        
        db.session.add(nueva_notificacion)    #GUARDADO EN BASE DE DATOS
        db.session.commit()
        
        return nueva_notificacion.to_json(), 201    #RESPUESTA A ANGULAR
