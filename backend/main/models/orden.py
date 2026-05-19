from .. import db

class Orden(db.Model):
    __tablename__ = 'orden'

    id_orden = db.Column(db.Integer, primary_key=True) 
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.id_pedido'), nullable=False)  #clave foranea que conecta con pedidos
    id_prod = db.Column(db.Integer, db.ForeignKey('productos.id_prod'), nullable=False)    #clave foranea que conecta con productos

    cantidad = db.Column(db.Integer, nullable=False)
    especificaciones = db.Column(db.String(200), nullable=True)
    precio_total = db.Column(db.Float, nullable=False)

    # Relaciones con Pedido y Producto
    pedido = db.relationship("Pedido", back_populates="ordenes", lazy='joined')    #lazy='joined' significa que cada vez que busques una Orden,SQLAlchemy va a traer automáticamente los datos del Pedido y del Producto asociados
    producto = db.relationship("Producto", back_populates="ordenes", lazy='joined')

    def to_json_complete(self):   #TRADUCTOR COMPLETO 
        return {
            "id_orden": self.id_orden,
            "cantidad": self.cantidad,
            "especificaciones": self.especificaciones,
            "precio_total": self.precio_total,
            "producto": self.producto.to_json() if self.producto else None,
            "pedido": self.pedido.to_json_short() if self.pedido else None
        }

    @staticmethod                       #CONSTRUCTOR DESDE JSON (Con validaciones de seguridad)
    def from_json(data):
        cantidad = data.get("cantidad", 1)
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser mayor a cero")

        precio_total = data.get("precio_total", 0)
        if precio_total < 0:
            raise ValueError("El precio total no puede ser negativo")

        return Orden(                     ## Construye y devuelve el objeto Python
            cantidad=cantidad,
            especificaciones=data.get("especificaciones"),
            precio_total=precio_total,
            id_pedido=data.get("id_pedido"),
            id_prod=data.get("id_prod")
        )
    def to_json(self):  #TRADUCTOR SIMPLE (Ideal para procesos rápidos (devuelve solo numeros)
        return {
            "id_orden": self.id_orden,
            "cantidad": self.cantidad,
            "especificaciones": self.especificaciones,
            "precio_total": self.precio_total,
            "id_pedido": self.id_pedido,
            "id_prod": self.id_prod
        }