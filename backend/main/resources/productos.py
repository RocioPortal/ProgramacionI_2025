from flask_restful import Resource
from flask import request, jsonify
from main.models import ProductoModel
from .. import db
from sqlalchemy import desc

#PRODUCTOS = {
#    1: {'nombre': 'Hamburguesa', 'precio': 10000},
#    2: {'nombre': 'Pizza', 'precio': 7000}
#}


# Función para verificar permisos (puede estar mejor centralizada luego)
def verificar_permiso(roles_requeridos):
    rol_usuario = 'ADMIN'  # Cambiar esto según lógica real
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

class Producto(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        producto = db.session.get(ProductoModel, id)
        if producto:
            return producto.to_json(), 200
        return {'message': 'Producto no encontrado'}, 404

    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

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

    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        producto = db.session.get(ProductoModel, id)
        if not producto:
            return {'message': 'Producto no encontrado'}, 404

        db.session.delete(producto)
        db.session.commit()
        return {'message': 'Producto eliminado con éxito'}, 200

class Productos(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        # Parámetros de paginación por defecto
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        # Construcción de la consulta base
        query = ProductoModel.query

        # Filtros
        nombre = request.args.get('nombre')
        if nombre:
            query = query.filter(ProductoModel.nombre.ilike(f"%{nombre}%"))

        disponible = request.args.get('disponible')
        if disponible is not None:
            if disponible.lower() == 'true':
                query = query.filter(ProductoModel.disponible.is_(True))
            elif disponible.lower() == 'false':
                query = query.filter(ProductoModel.disponible.is_(False))

        precio_min = request.args.get('precio_min')
        if precio_min:
            try:
                precio_min = float(precio_min)
                query = query.filter(ProductoModel.precio >= precio_min)
            except ValueError:
                return {'message': 'precio_min debe ser un número válido'}, 400

        precio_max = request.args.get('precio_max')
        if precio_max:
            try:
                precio_max = float(precio_max)
                query = query.filter(ProductoModel.precio <= precio_max)
            except ValueError:
                return {'message': 'precio_max debe ser un número válido'}, 400

        # Ordenamiento
        sort_by = request.args.get('sort_by')
        if sort_by == 'precio':
            query = query.order_by(ProductoModel.precio)
        elif sort_by == 'precio_desc':
            query = query.order_by(desc(ProductoModel.precio))
        elif sort_by == 'nombre':
            query = query.order_by(ProductoModel.nombre)
        elif sort_by == 'nombre_desc':
            query = query.order_by(desc(ProductoModel.nombre))

        # Paginación
        paginated = query.paginate(page=page, per_page=per_page, error_out=False)

        # Construcción de la respuesta
        productos = [producto.to_json() for producto in paginated.items]
        return jsonify({
            'productos': productos,
            'total': paginated.total,
            'pages': paginated.pages,
            'page': paginated.page,
            'per_page': paginated.per_page
        })

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        data = request.get_json()
        nuevo_producto = ProductoModel.from_json(data)
        db.session.add(nuevo_producto)
        db.session.commit()
        return nuevo_producto.to_json(), 201