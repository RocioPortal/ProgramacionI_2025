from flask import request, jsonify, Blueprint
from .. import db
from main.models import UsuarioModel
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    usuario = db.session.query(UsuarioModel).filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.password, password):
        return {'message': 'Usuario o contraseña incorrectos'}, 401

    access_token = create_access_token(identity=usuario)

    return {
        'id_user': usuario.id_user,
        'email': usuario.email,
        'rol': usuario.rol,
        'access_token': access_token
    }, 200

@auth.route('/register', methods=['POST'])
def register():
    try:
        usuario = UsuarioModel.from_json(request.get_json())
        exists = db.session.query(UsuarioModel).filter_by(email=usuario.email).first()
        if exists:
            return {'message': 'Email ya registrado'}, 409

        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    except Exception as e:
        db.session.rollback()
        return {'message': str(e)}, 400