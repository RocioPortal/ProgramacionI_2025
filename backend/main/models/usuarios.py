from .. import db
import json

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)

    pedidos = db.relationship("Pedido", back_populates="usuario",cascade="all, delete-orphan")
    notificaciones = db.relationship('Notificacion', back_populates='usuario', cascade="all, delete", single_parent=True)
    valoraciones = db.relationship('Valoracion', back_populates='usuario', cascade="all, delete", single_parent=True)

    def to_json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado
        }
    
    def to_json_complete(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado,
            'pedidos': [pedido.to_json() for pedido in self.pedidos],
            'valoraciones': [valoracion.to_json() for valoracion in self.valoraciones],
            'notificaciones': [notificacion.to_json() for notificacion in self.notificaciones]
        }

    def to_json_short(self):
        return {
            'id': self.id,
            'nombre': self.nombre
        }
    
    @staticmethod
    def from_json(usuario_json):
        return Usuario(
            id=usuario_json.get('id'),  
            nombre=usuario_json.get('nombre'),
            rol=usuario_json.get('rol'),
            estado=usuario_json.get('estado', 'activo')  
        )

