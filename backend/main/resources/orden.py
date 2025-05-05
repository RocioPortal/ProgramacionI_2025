from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import OrdenModel

class Orden(Resource):
    # Obtener una orden específica por ID
    def get(self, id):
        orden = db.session.query(OrdenModel).get_or_404(id)
        return orden.to_json(), 200

    # Eliminar una orden
    def delete(self, id):
        orden = db.session.query(OrdenModel).get_or_404(id)
        db.session.delete(orden)
        db.session.commit()
        return '', 204

    # Modificar una orden
    def put(self, id):
        orden = db.session.query(OrdenModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(orden, key, value)
        db.session.commit()
        return orden.to_json(), 201

class Ordenes(Resource):
    # Listar todas las órdenes
    def get(self):
        ordenes = db.session.query(OrdenModel).all()
        return jsonify({'ordenes': [orden.to_json() for orden in ordenes]})

    # Crear una nueva orden
    def post(self):
        orden = OrdenModel.from_json(request.get_json())
        try:
            db.session.add(orden)
            db.session.commit()
        except:
            return {'mensaje': 'Formato no correcto'}, 400
        return orden.to_json(), 201
