from .. import db

class Producto(db.Model):
    __tablename__ = 'productos'

    id_prod = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(200))
    precio = db.Column(db.Float, nullable=False)
    disponible = db.Column(db.Boolean, default=True)

    def to_json(self):
        return {
            'id_prod': self.id_prod,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': self.precio,
            'disponible': self.disponible
        }

    @staticmethod
    def from_json(producto_json):
        return Producto(
            id_prod=producto_json.get('id_prod'),
            nombre=producto_json.get('nombre'),
            descripcion=producto_json.get('descripcion'),
            precio=producto_json.get('precio'),
            disponible=producto_json.get('disponible', True)
        )