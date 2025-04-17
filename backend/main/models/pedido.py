from .. import db
from datetime import datetime
from . import UsuarioModel

class Pedido (db.Model):
    __tablename__ = 'pedidos'

    id_pedido = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)  
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.String(20), nullable=False, default='pendiente')  # 'pendiente', 'confirmado', 'cancelado' --> por default "pendiente"
    fecha_pedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    usuario  = db.relationship("Usuario", back_populates="pedidos") 


    def __repr__(self):
        return f"<Pedido nombre='{self.nombre}', estado='{self.estado}'>"

    # Convertir Pedido a JSON
    def to_json(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_user)
        pedido_json = {
            'id_pedido': self.id_pedido,
            'nombre': str(self.nombre),
            'precio': self.precio,
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.isoformat(),
            'usuario': self.usuario.to_json()  # Incluye los datos del usuario relacionado
        }
        return pedido_json
    


    def to_json_short(self):
        pedido_json = {
            'id_pedido': self.id_pedido,
            'nombre': str(self.nombre),
            'precio': self.precio,
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.isoformat(),
        }
        return pedido_json


    @staticmethod
    def from_json(pedido_json):
        id_pedido = pedido_json.get('id_pedido')
        id_user = pedido_json.get('id_user')
        nombre = pedido_json.get('nombre')
        precio = pedido_json.get('precio')
        estado = pedido_json.get('estado')
        fecha_pedido = pedido_json.get('fecha_pedido')

        if fecha_pedido:
            fecha_pedido = datetime.fromisoformat(fecha_pedido)
        else:
            fecha_pedido = datetime.utcnow()

        return Pedido(
            id_pedido=id_pedido,
            id_user=id_user,
            nombre=nombre,
            precio=precio,
            estado=estado,
            fecha_pedido=fecha_pedido
        )
