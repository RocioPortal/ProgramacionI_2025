from .. import db
from datetime import datetime

class Pedido (db.Model):
    id_pedido = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.String(20), nullable=False, default='pendiente')  # 'pendiente', 'confirmado', 'cancelado'
    fecha_pedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relación con Usuario
    usuario = db.relationship('Usuario', backref=db.backref('pedidos', lazy=True))


    # Convertir Pedido a JSON
    def to_json(self):
        pedido_json = {
            'id_pedido': self.id_pedido,
            'id_user': self.id_user,
            'nombre': str(self.nombre),
            'precio': self.precio,
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.isoformat() 
        }
        
        return pedido_json
