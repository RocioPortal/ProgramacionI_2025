from flask_restful import Resource
from flask import request, jsonify
from sqlalchemy import desc
from main.models import UsuarioModel
from .. import db
import re
from main.auth.decorators import role_required
from flask_jwt_extended import get_jwt_identity

class Usuario(Resource):
    @role_required(['USER', 'ADMIN', 'ENCARGADO'])
    def get(self, id_user):
        # id del usuario autenticado
        usuario_actual_id = get_jwt_identity()
        # comparación
        if str(usuario_actual_id) != str(id_user):
            usuario_actual = db.session.get(UsuarioModel, usuario_actual_id)
            if not usuario_actual or usuario_actual.rol != 'ADMIN':
                return {'message': 'No tienes permiso para ver esta información'}, 403

        usuario = db.session.get(UsuarioModel, id_user)
        if usuario:
            return usuario.to_json_complete(), 200
        return {'message': 'El usuario no existe'}, 404

    @role_required(['ADMIN'])
    def put(self, id_user):
        usuario = db.session.query(UsuarioModel).get(id_user)
        if not usuario:
            return 'El id que intentan editar es inexistente', 404

        data = request.get_json()

        # Validación del correo electrónico
        if 'email' in data:
            email = data['email']
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"message": "El correo electrónico no es válido"}, 400

        if 'nombre' in data:
            usuario.nombre = data['nombre']
        if 'rol' in data:
            usuario.rol = data['rol']
        if 'estado' in data:
            if data['estado'] == 'activo' and usuario.estado == 'suspendido':
                usuario.estado = 'activo'
            else:
                usuario.estado = data['estado']
        if 'email' in data:
            usuario.email = data['email']
        if 'telefono' in data:
            usuario.telefono = data['telefono']

        db.session.commit()
        return 'Usuario editado con éxito', 200

    @role_required(['ADMIN', 'ENCARGADO', 'USER'])
    def delete(self, id_user):
        # Obtener el ID del usuario autenticado
        usuario_actual_id = get_jwt_identity()

        # comparación 
        if str(usuario_actual_id) != str(id_user):
            usuario_actual = db.session.query(UsuarioModel).get(usuario_actual_id)
            if not usuario_actual or usuario_actual.rol not in ['ADMIN', 'ENCARGADO']:
                return {'message': 'No tienes permiso para eliminar este usuario'}, 403

        # Buscar el usuario a eliminar
        usuario = db.session.query(UsuarioModel).get(id_user)
        if not usuario:
            return {'message': 'El usuario no existe'}, 404

        # Cambiar el estado del usuario a "suspendido"
        usuario.estado = 'suspendido'
        db.session.commit()

        return {
            "id_user": usuario.id_user,
            "nombre": usuario.nombre,
            "rol": usuario.rol,
            "estado": 'suspendido',
            "email": usuario.email,
            "telefono": usuario.telefono
        }, 200

class Usuarios(Resource):
    @role_required(['ADMIN', 'ENCARGADO'])
    def get(self):
        page = 1
        per_page = 10

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        usuarios = db.session.query(UsuarioModel)

        #FILTROS

        # Filtrar por estado
        if request.args.get('estado'):
            usuarios = usuarios.filter(UsuarioModel.estado == request.args.get('estado'))

        # Filtrar por rol
        if request.args.get('rol'):
            usuarios = usuarios.filter(UsuarioModel.rol == request.args.get('rol'))

        # Filtrar por nombre
        if request.args.get('nombre'):
            usuarios = usuarios.filter(UsuarioModel.nombre.like(f"%{request.args.get('nombre')}%"))

        # Filtrar por email 
        if request.args.get('email'):
            usuarios = usuarios.filter(UsuarioModel.email.like(f"%{request.args.get('email')}%"))

        # Filtrar por teléfono
        if request.args.get('telefono'):
            usuarios = usuarios.filter(UsuarioModel.telefono.like(f"%{request.args.get('telefono')}%"))

        #ORDENAMIENTO

        # Ordenar por ID
        if request.args.get('sortby_id'):
            if request.args.get('sortby_id').lower() == 'desc':
                usuarios = usuarios.order_by(desc(UsuarioModel.id_user))
            else:
                usuarios = usuarios.order_by(UsuarioModel.id_user)

        # Ordenar por nombre
        if request.args.get('sortby_nombre'):
            if request.args.get('sortby_nombre').lower() == 'desc':
                usuarios = usuarios.order_by(desc(UsuarioModel.nombre))
            else:
                usuarios = usuarios.order_by(UsuarioModel.nombre)

        # Ordenar por rol
        if request.args.get('sortby_rol'):
            if request.args.get('sortby_rol').lower() == 'desc':
                usuarios = usuarios.order_by(desc(UsuarioModel.rol))
            else:
                usuarios = usuarios.order_by(UsuarioModel.rol)

        # Ordenar por estado
        if request.args.get('sortby_estado'):
            if request.args.get('sortby_estado').lower() == 'desc':
                usuarios = usuarios.order_by(desc(UsuarioModel.estado))
            else:
                usuarios = usuarios.order_by(UsuarioModel.estado)

        #resultado paginado
        usuarios_paginados = usuarios.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'usuarios': [usuario.to_json_complete() for usuario in usuarios_paginados.items],
            'total': usuarios_paginados.total,
            'pages': usuarios_paginados.pages,
            'page': page,
            'per_page': per_page
        })

    @role_required(['ADMIN'])
    def post(self):
        data = request.get_json()

        # Validar y restringir rol
        if 'rol' in data and data['rol'] != 'USER':
            return {"message": "Solo ADMIN puede asignar roles distintos a USER"}, 403
        else:
            data['rol'] = 'USER'  # Asignación automática si no es ADMIN

        # Validación de correo
        if 'email' in data:
            email = data['email']
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"message": "El correo electrónico no es válido"}, 400

        nuevo_usuario = UsuarioModel(
            nombre=data.get('nombre'),
            rol=data.get('rol'),
            estado=data.get('estado', 'suspendido'),
            email=data.get('email'),
            telefono=data.get('telefono')
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        return nuevo_usuario.to_json(), 201