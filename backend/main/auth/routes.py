from flask import request, jsonify, Blueprint
from .. import db
from main.models.usuarios import Usuario
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, verify_jwt_in_request, jwt_required
from flask_jwt_extended.exceptions import NoAuthorizationError
from main.mail.functions import sendMail                  # Importar la función para enviar correos

auth = Blueprint('auth', __name__, url_prefix='/auth') #Le dice a Flask: "Agrupá todas las rutas de este archivo y ponele a todas el prefijo /auth por delante".

@auth.route('/login', methods=['POST'])                  
def login():                                                #verifica credenciales y devuelve el token JWT.
    data = request.get_json()
    email = data.get('email')                #agarra el paquete con email y password que mandó el cliente
    password = data.get('password')

    usuario = db.session.query(Usuario).filter_by(email=email).first()  #busca en la base de datos un usuario con ese email. Si no encuentra, devuelve None. Si encuentra, devuelve el objeto Usuario.
    if not usuario or not usuario.validate_pass(password):
        return {'mensaje': 'Email o contraseña incorrectos'}, 401

    access_token = create_access_token(identity=str(usuario.id_user)) #máquina que fabrica el Token JWT

    return {
        'mensaje': 'Login exitoso',
        'token': access_token,
        'role': usuario.rol,
        'user': {
            'id_user': usuario.id_user,
            'email': usuario.email
        }
    }, 200


@auth.route('/register', methods=['POST'])
def register():                                                 #crea el usuario y manda el mail de bienvenida.
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("nombre"):  #Verifica que no falten datos
        return {"mensaje": "Faltan datos obligatorios (email, nombre o password)"}, 400

    existe = db.session.query(Usuario).filter_by(email=data["email"]).first()
    if existe:
        return {"mensaje": "El email ya está registrado"}, 409  #conflicto

    try:
        nuevo_usuario = Usuario.from_json(data)   #guarda datos
        db.session.add(nuevo_usuario)
        db.session.commit()

        # Enviar correo de bienvenida
        sendMail(                                          # garra plantilla HTML register.html
            to=[nuevo_usuario.email],         
            subject="¡Bienvenid@ a nuestra aplicación!",
            template="register",
            nombre=nuevo_usuario.nombre,
            app_name="Sabores de Mamás"
        )

        return {"mensaje": "Usuario registrado correctamente"}, 201

    except Exception as e:
        db.session.rollback()
        return {"mensaje": f"Error al registrar: {str(e)}"}, 500
