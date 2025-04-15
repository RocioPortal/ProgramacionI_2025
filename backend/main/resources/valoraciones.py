from flask_restful import Resource
from flask import request
from main.models import ValoracionesModel
from main import db


#VALORACIONES = {}

def verificar_permiso(roles_requeridos):
    rol_usuario = request.headers.get('Rol', '')
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

class Valoracion(Resource):
    def post(self, producto_id):
        permitido, mensaje, codigo = verificar_permiso(['USER'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        if 'id_user' not in data or 'calificacion' not in data or 'comentario' not in data:
            return "Faltan datos obligatorios", 400
        
        #if 'calificacion' not in data or 'comentario' not in data:
            #return "Debes proporcionar una calificación y un comentario", 400
        
        if not (1 <= data['calificacion'] <= 5):
            return "La calificación debe estar entre 1 y 5", 400
        
        #if producto_id not in VALORACIONES:
            #VALORACIONES[producto_id] = []
        
        #VALORACIONES[producto_id].append({
            #'calificacion': data['calificacion'],
            #'comentario': data['comentario']
        #})
        nueva_valoracion = Valoracion(
            id_user=data['id_user'],
            id_prod=producto_id,
            calificacion=data['calificacion'],
            comentario=data['comentario']
        )

        db.session.add(nueva_valoracion)
        db.session.commit()
        
        #return {"mensaje": "Valoracion agregada exitosamente", "valoraciones": VALORACIONES}, 201
        return nueva_valoracion.get_json(), 201
         
    def get(self, producto_id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        #return VALORACIONES.get(producto_id, [])
        valoraciones = Valoracion.query.filter_by(id_prod=producto_id).all()
        return [v.get_json() for v in valoraciones], 200