from .. import db
from datetime import datetime
from . import UsuarioModel

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id_pedido = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuario.id_user'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(20), nullable=False, default='pendiente')
    fecha_pedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    usuario = db.relationship("Usuario", back_populates="pedidos")
    
    # Relación con tabla intermedia Orden
    ordenes = db.relationship("Orden",back_populates="pedido",cascade="all, delete-orphan",lazy="select",passive_deletes=True)
    
    def __repr__(self):
        return f"<Pedido nombre='{self.nombre}', estado='{self.estado}'>"

    def to_json(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_user)
        return {
            'id_pedido': self.id_pedido,
            'nombre': str(self.nombre),
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.strftime("%d/%m/%Y"),
            'usuario': self.usuario.to_json_short()
        }

    def to_json_complete(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_user)
        return {
            'id_pedido': self.id_pedido,
            'nombre': str(self.nombre),
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.strftime("%d/%m/%Y"),
            'usuario': self.usuario.to_json()
        }

    def to_json_short(self):
        return {
            'id_pedido': self.id_pedido,
            'nombre': str(self.nombre),
            'estado': str(self.estado),
            'fecha_pedido': self.fecha_pedido.strftime("%d/%m/%Y"),
        }

    @staticmethod
    def from_json(pedido_json):
        id_pedido = pedido_json.get('id_pedido')
        id_user = pedido_json.get('id_user')
        nombre = pedido_json.get('nombre')
        estado = pedido_json.get('estado')
        fecha_pedido = pedido_json.get('fecha_pedido')

        if fecha_pedido:
            try:
                fecha_pedido = datetime.strptime(fecha_pedido, "%d/%m/%Y").date()
            except ValueError:
                fecha_pedido = datetime.utcnow().date()
        else:
            fecha_pedido = datetime.utcnow().date()


        return Pedido(
            id_pedido=id_pedido,
            id_user=id_user,
            nombre=nombre,
            estado=estado,
            fecha_pedido=fecha_pedido
        )