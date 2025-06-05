from flask import request, jsonify, Blueprint
from .. import db
from main.models.usuarios import Usuario
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, verify_jwt_in_request, jwt_required
from flask_jwt_extended.exceptions import NoAuthorizationError

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    usuario = db.session.query(Usuario).filter_by(email=email).first()
    if not usuario or not usuario.validate_pass(password):
        return {'mensaje': 'Email o contraseña incorrectos'}, 401

    # PASAR SOLO EL ID como string
    access_token = create_access_token(identity=str(usuario.id_user))

    return {
        'mensaje': 'Login exitoso',
        'token': access_token,
        'usuario': {
            'id_user': usuario.id_user,
            'email': usuario.email
        }
    }, 200


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("nombre"):
        return {"mensaje": "Faltan datos obligatorios (email, nombre o password)"}, 400

    existe = db.session.query(Usuario).filter_by(email=data["email"]).first()
    if existe:
        return {"mensaje": "El email ya está registrado"}, 409

    try:
        nuevo_usuario = Usuario.from_json(data)
        db.session.add(nuevo_usuario)
        db.session.commit()
        return {"mensaje": "Usuario registrado correctamente"}, 201

    except Exception as e:
        db.session.rollback()
        return {"mensaje": f"Error al registrar: {str(e)}"}, 500
    
