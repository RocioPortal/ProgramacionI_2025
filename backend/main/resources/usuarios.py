from flask_restful import Resource
from flask import request, jsonify
from main.models import UsuarioModel
from .. import db
import re


def verificar_permiso(roles_requeridos):
    rol_usuario = 'ADMIN'  
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200


class Usuario(Resource):
    def get(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        usuario = db.session.query(UsuarioModel).get(id_user)
        if usuario:
            return usuario.to_json_complete(), 200
        return 'El id es inexistente', 404

    def put(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

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

    def delete(self, id_user):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo

        usuario = db.session.query(UsuarioModel).get(id_user)
        if not usuario:
            return 'El id a eliminar es inexistente', 404

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
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
            
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
        usuarios = db.session.query(UsuarioModel)
        
        ### FILTROS ###
        
        # Filtrar por estado
        if request.args.get('estado'):
            usuarios = usuarios.filter(UsuarioModel.estado == request.args.get('estado'))
        
        # Filtrar por rol
        if request.args.get('rol'):
            usuarios = usuarios.filter(UsuarioModel.rol == request.args.get('rol'))
        
        # Filtrar por nombre (búsqueda parcial)
        if request.args.get('nombre'):
            usuarios = usuarios.filter(UsuarioModel.nombre.like(f"%{request.args.get('nombre')}%"))
        
        # Filtrar por email (búsqueda parcial)
        if request.args.get('email'):
            usuarios = usuarios.filter(UsuarioModel.email.like(f"%{request.args.get('email')}%"))
        
        # Filtrar por teléfono
        if request.args.get('telefono'):
            usuarios = usuarios.filter(UsuarioModel.telefono.like(f"%{request.args.get('telefono')}%"))
            
        ### ORDENAMIENTO ###
        
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
        
        # Ordenar por email
        if request.args.get('sortby_email'):
            if request.args.get('sortby_email').lower() == 'desc':
                usuarios = usuarios.order_by(desc(UsuarioModel.email))
            else:
                usuarios = usuarios.order_by(UsuarioModel.email)
                
        ### FIN ORDENAMIENTO ###
        
        # Obtener resultado paginado
        usuarios_paginados = usuarios.paginate(page=page, per_page=per_page, error_out=False)
        
        # Devolver resultado paginado en formato JSON
        return jsonify({
            'usuarios': [usuario.to_json_complete() for usuario in usuarios_paginados.items],
            'total': usuarios_paginados.total,
            'pages': usuarios_paginados.pages,
            'page': page,
            'per_page': per_page
        })

    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo

        data = request.get_json()

        # Validación del correo electrónico
        if 'email' in data:
            email = data['email']
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"message": "El correo electrónico no es válido"}, 400
            
        nuevo_usuario = UsuarioModel(
            nombre=data.get('nombre'),
            rol=data.get('rol'),
            estado=data.get('estado', 'activo'),
            email=data.get('email'),
            telefono=data.get('telefono')
        )
        db.session.add(nuevo_usuario)
        db.session.commit()

        return nuevo_usuario.to_json(), 201