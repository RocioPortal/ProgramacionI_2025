from .. import jwt
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from main.models.usuarios import Usuario
from .. import db


def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims['rol'] in roles:
                return fn(*args, **kwargs)
            return {"msg": "No autorizado"}, 403
        return wrapper
    return decorator

@jwt.user_identity_loader
def user_identity_lookup(user_id):
    return str(user_id)

@jwt.additional_claims_loader
def add_claims_to_access_token(user_id):
    usuario = db.session.get(Usuario, int(user_id))  # buscamos el usuario por ID
    return {
        'rol': usuario.rol,
        'id': usuario.id_user,
        'email': usuario.email
    }