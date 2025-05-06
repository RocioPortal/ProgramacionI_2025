from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import OrdenModel, PedidoModel

class Orden(Resource):
    # Obtener una orden específica por ID
    def get(self, id):
        orden = db.session.query(OrdenModel).get_or_404(id)
        return orden.to_json_complete(), 200

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
    def get(self):
        ordenes = db.session.query(OrdenModel).all()
        return jsonify({'ordenes': [orden.to_json_complete() for orden in ordenes]})

    def post(self):
        data = request.get_json()

        # Si viene un pedido anidado, lo creamos
        if 'pedido' in data:
            pedido_data = data['pedido']
            nuevo_pedido = PedidoModel(
                id_user=pedido_data.get('id_user'),
                nombre=pedido_data.get('nombre'),
                estado=pedido_data.get("estado", "pendiente")  # valor por defecto
            )

            db.session.add(nuevo_pedido)
            db.session.commit()
            data['id_pedido'] = nuevo_pedido.id_pedido  

        
        try:
            orden = OrdenModel.from_json(data)
            db.session.add(orden)
            db.session.commit()
            return orden.to_json(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500