from flask_restful import Resource
from flask import request, jsonify
from main.models import ValoracionesModel
from main import db
from sqlalchemy import func, desc

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
        
        if not (1 <= data['calificacion'] <= 5):
            return "La calificación debe estar entre 1 y 5", 400
        
        nueva_valoracion = ValoracionesModel(
            id_user=data['id_user'],
            id_prod=producto_id,
            calificacion=data['calificacion'],
            comentario=data['comentario']
        )
        db.session.add(nueva_valoracion)
        db.session.commit()
        
        return nueva_valoracion.get_json(), 201
    
    def get(self, producto_id):
        # Página inicial por defecto
        page = 1
        # Cantidad de elementos por página por defecto
        per_page = 10
        
        # Obtener los parámetros de consulta para paginación
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        # Iniciar la consulta base
        valoraciones = db.session.query(ValoracionesModel).filter_by(id_prod=producto_id)
        
        # Filtros
        
        # Filtrar por calificación
        if request.args.get('calificacion'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion == int(request.args.get('calificacion')))
        
        # Filtrar por rango de calificación (mínima)
        if request.args.get('calificacion_min'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion >= int(request.args.get('calificacion_min')))
        
        # Filtrar por rango de calificación (máxima)
        if request.args.get('calificacion_max'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion <= int(request.args.get('calificacion_max')))
        
        # Filtrar por texto en el comentario
        if request.args.get('comentario'):
            valoraciones = valoraciones.filter(ValoracionesModel.comentario.like(f"%{request.args.get('comentario')}%"))
        
        # Filtrar por usuario
        if request.args.get('id_user'):
            valoraciones = valoraciones.filter(ValoracionesModel.id_user == int(request.args.get('id_user')))
        
        # Ordenamientos
        
        # Ordenar por calificación (ascendente o descendente)
        if request.args.get('sortby_calificacion'):
            if request.args.get('sortby_calificacion').lower() == 'desc':
                valoraciones = valoraciones.order_by(desc(ValoracionesModel.calificacion))
            else:
                valoraciones = valoraciones.order_by(ValoracionesModel.calificacion)
        
        # Ordenar por fecha (asumiendo que hay un campo fecha_creacion)
        if request.args.get('sortby_fecha') and hasattr(ValoracionesModel, 'fecha_creacion'):
            if request.args.get('sortby_fecha').lower() == 'desc':
                valoraciones = valoraciones.order_by(desc(ValoracionesModel.fecha_creacion))
            else:
                valoraciones = valoraciones.order_by(ValoracionesModel.fecha_creacion)
        
        # Obtener resultado paginado
        valoraciones_paginadas = valoraciones.paginate(page=page, per_page=per_page, error_out=False)
        
        # Verificar permisos para ver todas las valoraciones
        if request.args.get('admin') == 'true':
            permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
            if not permitido:
                return mensaje, codigo
        
        # Devolver resultado paginado en formato JSON
        return jsonify({
            'valoraciones': [v.get_json() for v in valoraciones_paginadas.items],
            'total': valoraciones_paginadas.total,
            'pages': valoraciones_paginadas.pages,
            'page': page,
            'per_page': per_page
        })