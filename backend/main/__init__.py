from flask import Flask
from dotenv import load_dotenv

from flask_restful import Api

import main.resources as resources

#Inicializamos restful
api = Api()

def create_app():
    #Inicializar flask
    app = Flask(__name__)
    #cargamos variables de entorno
    load_dotenv()
       
    #cargar los recursos
    api.add_resource(resources.UsuarioResource, '/usuario/<int:id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')

    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.ProductoResource, '/producto/<int:id>')

    api.add_resource(resources.ValoracionResource, "/productos/<int:producto_id>/valoraciones")
    api.add_resource(resources.NotificacionResource, "/usuarios/<int:usuario_id>/notificaciones")

    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.PedidoResource, '/pedido/<int:id>')

    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.LogoutResource, '/logout')

    
    api.init_app(app)
    return app