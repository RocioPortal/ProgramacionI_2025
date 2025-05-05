from .. import db

class Orden(db.Model):
    __tablename__ = 'orden'

    id_orden = db.Column(db.Integer, primary_key=True) 
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id_pedido'), nullable=False)
    id_prod = db.Column(db.Integer, db.ForeignKey('productos.id_prod'), nullable=False)

    cantidad = db.Column(db.Integer, nullable=False)
    especificaciones = db.Column(db.String(200), nullable=True)
    precio_total = db.Column(db.Float, nullable=False)

    # Relaciones con Pedido y Producto
    pedido = db.relationship("Pedido", back_populates="ordenes")
    producto = db.relationship("Producto", back_populates="ordenes")

    def to_json(self):
        return {
            "id_orden": self.id_orden,
            "id_pedido": self.id_pedido,
            "id_prod": self.id_prod,
            "cantidad": self.cantidad,
            "especificaciones": self.especificaciones,
            "precio_total": self.precio_total
        }

    @staticmethod
    def from_json(data):
        return Orden(
            id_orden=data.get('id_orden'),
            id_pedido=data.get('id_pedido'),
            id_prod=data.get('id_prod'),
            cantidad=data.get('cantidad'),
            especificaciones=data.get('especificaciones'),
            precio_total=data.get('precio_total')
        )