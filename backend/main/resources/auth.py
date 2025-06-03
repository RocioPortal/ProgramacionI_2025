from flask_restful import Resource
from flask import request
from main.auth.decorators import role_required


TOKENS = {
    "admin": "token-admin",
    "user1": "token-user1",
    "encargado": "token-encargado"
}

ROLES = {
    "admin": "ADMIN",
    "user1": "USER",
    "encargado": "ENCARGADO"
}

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        
        if not username or not password:
            return {"mensaje": "Usuario y contraseña son requeridos"}, 400
        
        if username == "admin" and password == "1234":
            token = "token-admin"
        elif username == "user1" and password == "abcd":
            token = "token-user1"
        elif username == "encargado" and password == "5678":
            token = "token-encargado"
        else:
            return {"mensaje": "Credenciales incorrectas"}, 401
        
        TOKENS[username] = token
        return {"mensaje": "Login exitoso", "token": token, "rol": ROLES[username]}, 200

class Logout(Resource):
    def post(self):
        data = request.get_json()
        token = data.get("token")
        
        if not token:
            return {"mensaje": "Token requerido"}, 400
        
        user_to_logout = None
        for user, stored_token in TOKENS.items():
            if stored_token == token:
                user_to_logout = user
                break
        
        if user_to_logout and ROLES[user_to_logout] in ["USER", "ADMIN", "ENCARGADO"]:
            del TOKENS[user_to_logout]
            return {"mensaje": "Logout exitoso"}, 200
        
        return {"mensaje": "Token inválido o sin permisos"}, 401
