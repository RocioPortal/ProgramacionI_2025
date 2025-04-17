from .. import db
import json

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)

    pedidos = db.relationship("Pedido", back_populates="usuario",cascade="all, delete-orphan")


    def to_json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado
        }




















#arreglos