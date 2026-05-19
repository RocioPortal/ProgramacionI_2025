from .. import jwt
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps                                 #herramienta nativa de Python obligatoria para construir decoradores
from main.models.usuarios import Usuario
from .. import db


def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):           #Frena la petición y exige que haya un Token JWT válido.
            verify_jwt_in_request()                    #exige ver el token JWT
            claims = get_jwt()                          #lee payload 
            if claims['rol'] in roles:                  #verficica el rol
                return fn(*args, **kwargs)       #ejecuta la función original si el rol es correcto
            return {"msg": "No autorizado"}, 403   #sino, da "prohibido" (403)
        return wrapper
    return decorator

@jwt.user_identity_loader                        
def user_identity_lookup(user_id):            #se asegura de que el ID del usuario se guarde como un texto
    return str(user_id)

@jwt.additional_claims_loader                      #decorador le dice a Flask: "Che, cuando crees un token, ejecutá esta función para agregarle datos extra".
def add_claims_to_access_token(usuario_id):       #Va a la base de datos y busca quién es este usuario.
    usuario = db.session.query(Usuario).get(usuario_id)  
    if not usuario:
        return {}
    claims = {                                       #Arma una "valijita" (claims) con los datos más importantes de esa persona
        'rol': usuario.rol,
        'id': usuario.id_user,
        'email': usuario.email
    }
    return claims

#'rol' adentro del token en el momento del Login