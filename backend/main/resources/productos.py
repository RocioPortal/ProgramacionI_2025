from flask_restful import Resource
from flask import request, jsonify
from main.models import ProductoModel
from .. import db
from sqlalchemy import desc
from flask_jwt_extended import jwt_required
from main.auth.decorators import role_required

class Producto(Resource):
    @jwt_required()
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def get(self, id):
        producto = db.session.get(ProductoModel, id)
        if producto:
            return producto.to_json(), 200
        return {'message': 'Producto no encontrado'}, 404

    @jwt_required()
    @role_required(['ADMIN', 'ENCARGADO'])
    def put(self, id):
        producto = db.session.get(ProductoModel, id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        data = request.get_json()
        producto.nombre = data.get('nombre', producto.nombre)
        producto.descripcion = data.get('descripcion', producto.descripcion)
        producto.precio = data.get('precio', producto.precio)
        producto.disponible = data.get('disponible', producto.disponible)

        db.session.commit()
        return {'message': 'Producto actualizado con éxito'}, 200

    @jwt_required()
    @role_required(['ADMIN'])
    def delete(self, id):
        producto = db.session.get(ProductoModel, id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        db.session.delete(producto)
        db.session.commit()
        return {'message': 'Producto eliminado con éxito'}, 200


class Productos(Resource):
    @jwt_required()
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def get(self):
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        query = ProductoModel.query

        # Filtros
        if nombre := request.args.get('nombre'):
            query = query.filter(ProductoModel.nombre.ilike(f"%{nombre}%"))

        if disponible := request.args.get('disponible'):
            if disponible.lower() == 'true':
                query = query.filter(ProductoModel.disponible.is_(True))
            elif disponible.lower() == 'false':
                query = query.filter(ProductoModel.disponible.is_(False))

        if precio_min := request.args.get('precio_min'):
            try:
                query = query.filter(ProductoModel.precio >= float(precio_min))
            except ValueError:
                return {'message': 'precio_min debe ser un número válido'}, 400

        if precio_max := request.args.get('precio_max'):
            try:
                query = query.filter(ProductoModel.precio <= float(precio_max))
            except ValueError:
                return {'message': 'precio_max debe ser un número válido'}, 400

        # Ordenamiento
        match request.args.get('sort_by'):
            case 'precio':
                query = query.order_by(ProductoModel.precio)
            case 'precio_desc':
                query = query.order_by(desc(ProductoModel.precio))
            case 'nombre':
                query = query.order_by(ProductoModel.nombre)
            case 'nombre_desc':
                query = query.order_by(desc(ProductoModel.nombre))

        paginated = query.paginate(page=page, per_page=per_page, error_out=False)

        productos = [producto.to_json() for producto in paginated.items]
        return jsonify({
            'productos': productos,
            'total': paginated.total,
            'pages': paginated.pages,
            'page': paginated.page,
            'per_page': paginated.per_page
        })

    @jwt_required()
    @role_required(['ADMIN'])
    def post(self):
        data = request.get_json()
        nuevo_producto = ProductoModel.from_json(data)
        db.session.add(nuevo_producto)
        db.session.commit()
        return nuevo_producto.to_json(), 201