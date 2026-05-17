from .. import jwt
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps          #herramienta nativa de Python obligatoria para construir decoradores
from main.models.usuarios import Usuario
from .. import db


def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()                    #exige ver el token JWT
            claims = get_jwt()                          #lee payload 
            if claims['rol'] in roles:                  #verficica el rol
                return fn(*args, **kwargs)       #ejecuta la función original si el rol es correcto
            return {"msg": "No autorizado"}, 403
        return wrapper
    return decorator

@jwt.user_identity_loader
def user_identity_lookup(user_id):
    return str(user_id)

@jwt.additional_claims_loader
def add_claims_to_access_token(usuario_id):
    usuario = db.session.query(Usuario).get(usuario_id)
    if not usuario:
        return {}
    claims = {
        'rol': usuario.rol,
        'id': usuario.id_user,
        'email': usuario.email
    }
    return claims