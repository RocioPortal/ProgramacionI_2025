from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Inicializaciones fuera de create_app
api = Api()
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.getenv('DATABASE_PATH') + os.getenv('DATABASE_NAME')

    db.init_app(app)
    migrate.init_app(app, db)  # ← AQUÍ es donde debe estar

    # Configurar JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    import main.resources as resources
    from main.resources.orden import Orden, Ordenes

    # Registrar recursos
    api.add_resource(resources.UsuarioResource, '/usuario/<int:id_user>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.ProductoResource, '/producto/<int:id>')
    api.add_resource(resources.ValoracionResource, "/valoraciones")
    api.add_resource(resources.NotificacionResource, "/usuarios/<int:usuario_id>/notificaciones")
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.PedidoResource, '/pedido/<int:id>')
    api.add_resource(resources.OrdenesResource, '/ordenes')
    api.add_resource(resources.OrdenResource, '/orden/<int:id>')

    api.init_app(app)

    from main.auth import routes
    app.register_blueprint(routes.auth)

    return app