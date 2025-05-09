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
        ordenes = db.session.query(OrdenModel)
        
        ### FILTROS ###
        
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
        
        # Filtrar por monto total (asumiendo que existe un campo monto_total)
        if request.args.get('monto_minimo') and hasattr(OrdenModel, 'monto_total'):
            ordenes = ordenes.filter(OrdenModel.monto_total >= float(request.args.get('monto_minimo')))
        if request.args.get('monto_maximo') and hasattr(OrdenModel, 'monto_total'):
            ordenes = ordenes.filter(OrdenModel.monto_total <= float(request.args.get('monto_maximo')))
        
        # Filtrar por nombre de cliente (asumiendo relación con pedido)
        if request.args.get('nombre_cliente'):
            ordenes = ordenes.join(PedidoModel).filter(
                PedidoModel.nombre.like(f"%{request.args.get('nombre_cliente')}%")
            )
        
        ### ORDENAMIENTO ###
        
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
        
        # Ordenar por monto total (asumiendo que existe un campo monto_total)
        if request.args.get('sortby_monto') and hasattr(OrdenModel, 'monto_total'):
            if request.args.get('sortby_monto').lower() == 'desc':
                ordenes = ordenes.order_by(desc(OrdenModel.monto_total))
            else:
                ordenes = ordenes.order_by(OrdenModel.monto_total)
        
        # Ordenar por estado de pedido
        if request.args.get('sortby_estado'):
            if request.args.get('sortby_estado').lower() == 'desc':
                ordenes = ordenes.join(PedidoModel).order_by(desc(PedidoModel.estado))
            else:
                ordenes = ordenes.join(PedidoModel).order_by(PedidoModel.estado)
        
        ### FIN ORDENAMIENTO ###
        
        # Obtener resultado paginado
        ordenes_paginadas = ordenes.paginate(page=page, per_page=per_page, error_out=False)
        
        # Devolver resultado paginado en formato JSON
        return jsonify({
            'ordenes': [orden.to_json_complete() for orden in ordenes_paginadas.items],
            'total': ordenes_paginadas.total,
            'pages': ordenes_paginadas.pages,
            'page': page,
            'per_page': per_page
        })

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