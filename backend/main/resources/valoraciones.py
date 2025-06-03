from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import desc
from main.models import ValoracionesModel
from main import db
from main.auth.decorators import role_required


class Valoracion(Resource):
    @jwt_required()
    @role_required(['USER'])
    def post(self):
        data = request.get_json()
        campos_obligatorios = ['id_user', 'id_prod', 'calificacion', 'comentario']
        if not all(campo in data for campo in campos_obligatorios):
            return "Faltan datos obligatorios", 400

        if not (1 <= data['calificacion'] <= 5):
            return "La calificación debe estar entre 1 y 5", 400

        nueva_valoracion = ValoracionesModel(
            id_user=data['id_user'],
            id_prod=data['id_prod'],
            calificacion=data['calificacion'],
            comentario=data['comentario']
        )
        db.session.add(nueva_valoracion)
        db.session.commit()

        return nueva_valoracion.get_json(), 201

    @jwt_required()
    def get(self):
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        valoraciones = db.session.query(ValoracionesModel)

        # Filtros
        if request.args.get('id_prod'):
            valoraciones = valoraciones.filter(ValoracionesModel.id_prod == int(request.args.get('id_prod')))
        if request.args.get('id_user'):
            valoraciones = valoraciones.filter(ValoracionesModel.id_user == int(request.args.get('id_user')))
        if request.args.get('calificacion'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion == int(request.args.get('calificacion')))
        if request.args.get('calificacion_min'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion >= int(request.args.get('calificacion_min')))
        if request.args.get('calificacion_max'):
            valoraciones = valoraciones.filter(ValoracionesModel.calificacion <= int(request.args.get('calificacion_max')))

        # Ordenamientos
        if request.args.get('sortby_calificacion'):
            if request.args.get('sortby_calificacion').lower() == 'desc':
                valoraciones = valoraciones.order_by(desc(ValoracionesModel.calificacion))
            else:
                valoraciones = valoraciones.order_by(ValoracionesModel.calificacion)

        if request.args.get('sortby_fecha') and hasattr(ValoracionesModel, 'fecha_creacion'):
            if request.args.get('sortby_fecha').lower() == 'desc':
                valoraciones = valoraciones.order_by(desc(ValoracionesModel.fecha_creacion))
            else:
                valoraciones = valoraciones.order_by(ValoracionesModel.fecha_creacion)

        # Paginación
        valoraciones_paginadas = valoraciones.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'valoraciones': [v.get_json() for v in valoraciones_paginadas.items],
            'total': valoraciones_paginadas.total,
            'pages': valoraciones_paginadas.pages,
            'page': page,
            'per_page': per_page
        })