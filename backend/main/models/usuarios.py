from .. import db
import json

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id_user = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    telefono = db.Column(db.String(20), nullable=True)

    pedidos = db.relationship("Pedido", back_populates="usuario", cascade="all, delete-orphan")
    notificaciones = db.relationship('Notificacion', back_populates='usuario', cascade="all, delete", single_parent=True)
    valoraciones = db.relationship('Valoracion', back_populates='usuario', cascade="all, delete", single_parent=True)

    def to_json(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado,
            'email': self.email,
            'telefono': self.telefono
        }
    
    def to_json_complete(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado,
            'email': self.email,
            'telefono': self.telefono,
            'pedidos': [pedido.to_json() for pedido in self.pedidos],
            'valoraciones': [valoracion.get_json() for valoracion in self.valoraciones],
            'notificaciones': [notificacion.to_json() for notificacion in self.notificaciones]
        }

    def to_json_short(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono
        }
    
    @staticmethod
    def from_json(usuario_json):
        return Usuario(
            id_user=usuario_json.get('id_user'),
            nombre=usuario_json.get('nombre'),
            rol=usuario_json.get('rol'),
            estado=usuario_json.get('estado', 'activo'),
            email=usuario_json.get('email'),
            telefono=usuario_json.get('telefono')
        )

