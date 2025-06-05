from .. import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_user = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='USER')
    estado = db.Column(db.String(20), nullable=False, default='suspendido')
    email = db.Column(db.String(64), unique=True, index=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    telefono = db.Column(db.String(20))

    pedidos = db.relationship('Pedido', back_populates='usuario', cascade='all, delete-orphan')
    valoraciones = db.relationship('Valoracion', back_populates='usuario', cascade="all, delete-orphan")
    notificaciones = db.relationship('Notificacion', back_populates='usuario', cascade="all, delete-orphan")

    # ----- Autenticación -----

    @property
    def plain_password(self):
        raise AttributeError('La contraseña no se puede leer.')

    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)

    def validate_pass(self, password):
        return check_password_hash(self.password, password)


    def to_json(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado,
            'email': self.email,
            'telefono': self.telefono
        }

    def to_json_short(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'email': self.email
        }

    def to_json_complete(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono,
            'estado': self.estado,
            'rol': self.rol,
            'pedidos': [p.to_json_short() for p in self.pedidos] if self.pedidos else [],
            'notificaciones': [n.to_json() for n in self.notificaciones] if self.notificaciones else [],
            'valoraciones': [v.to_json() for v in self.valoraciones] if self.valoraciones else []
        }

    @staticmethod
    def from_json(usuario_json):
        id_user = usuario_json.get("id_user")
        nombre = usuario_json.get('nombre')
        email = usuario_json.get('email')
        telefono = usuario_json.get('telefono')
        estado = usuario_json.get('estado', 'suspendido')
        rol = usuario_json.get('rol', 'USER')
        password = usuario_json.get('password')

        usuario = Usuario(
            id_user=id_user,
            nombre=nombre,
            email=email,
            telefono=telefono,
            estado=estado,
            rol=rol
        )

        if password:
            usuario.plain_password = password

        return usuario