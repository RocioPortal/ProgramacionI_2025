from flask_restful import Resource
from flask import request, jsonify
from sqlalchemy import desc
from .. import db
from main.models import OrdenModel, PedidoModel, ProductoModel

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
        page = 1
        per_page = 10
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ordenes = db.session.query(OrdenModel)
        
        #FILTROS
        
        # Filtrar por ID de pedido
        if request.args.get('id_pedido'):
            ordenes = ordenes.filter(OrdenModel.id_pedido == int(request.args.get('id_pedido')))
        
        # Filtrar por ID de usuario (asumiendo que existe una relación con pedido y pedido tiene id_user)
        if request.args.get('id_user'):
            ordenes = ordenes.join(PedidoModel).filter(PedidoModel.id_user == int(request.args.get('id_user')))
        
        # Filtrar por fecha (asumiendo que existe un campo fecha_creacion)
        if request.args.get('fecha_desde') and hasattr(OrdenModel, 'fecha_creacion'):
            ordenes = ordenes.filter(OrdenModel.fecha_creacion >= request.args.get('fecha_desde'))
        if request.args.get('fecha_hasta') and hasattr(OrdenModel, 'fecha_creacion'):
            ordenes = ordenes.filter(OrdenModel.fecha_creacion <= request.args.get('fecha_hasta'))
        
        # Filtrar por estado de pedido
        if request.args.get('estado'):
            ordenes = ordenes.join(PedidoModel).filter(PedidoModel.estado == request.args.get('estado'))
        
        # Filtrar por nombre de cliente (asumiendo relación con pedido)
        if request.args.get('nombre_cliente'):
            ordenes = ordenes.join(PedidoModel).filter(
                PedidoModel.nombre.like(f"%{request.args.get('nombre_cliente')}%")
            )
        
        #ORDENAMIENTO
        
        # Ordenar por ID
        if request.args.get('sortby_id'):
            if request.args.get('sortby_id').lower() == 'desc':
                ordenes = ordenes.order_by(desc(OrdenModel.id))
            else:
                ordenes = ordenes.order_by(OrdenModel.id)
        
        # Ordenar por fecha (asumiendo que existe un campo fecha_creacion)
        if request.args.get('sortby_fecha') and hasattr(OrdenModel, 'fecha_creacion'):
            if request.args.get('sortby_fecha').lower() == 'desc':
                ordenes = ordenes.order_by(desc(OrdenModel.fecha_creacion))
            else:
                ordenes = ordenes.order_by(OrdenModel.fecha_creacion)
        
        # Ordenar por estado de pedido
        if request.args.get('sortby_estado'):
            if request.args.get('sortby_estado').lower() == 'desc':
                ordenes = ordenes.join(PedidoModel).order_by(desc(PedidoModel.estado))
            else:
                ordenes = ordenes.join(PedidoModel).order_by(PedidoModel.estado)
        
        ordenes_paginadas = ordenes.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'ordenes': [orden.to_json_complete() for orden in ordenes_paginadas.items],
            'total': ordenes_paginadas.total,
            'pages': ordenes_paginadas.pages,
            'page': page,
            'per_page': per_page
        })

    def post(self):
        data = request.get_json()

        pedido_data = data.get("pedido")
        if not pedido_data:
            return {"message": "Datos del pedido faltan"}, 400

        nuevo_pedido = PedidoModel.from_json(pedido_data)
        db.session.add(nuevo_pedido)
        db.session.flush()  

        productos_data = data.get("productos")
        if not productos_data:
            return {"message": "Lista de productos faltante"}, 400

        for producto in productos_data:
            try:
                orden = OrdenModel.from_json({
                    **producto,
                    "id_pedido": nuevo_pedido.id_pedido
                })
                db.session.add(orden)
            except ValueError as e:
                db.session.rollback()
                return {"message": str(e)}, 400

        db.session.commit()
        return {"message": "Pedido y órdenes creados con éxito"}, 201