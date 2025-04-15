from .. import db

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado
        }
    
    @staticmethod
    def from_json(usuario_json):
        return Usuario(
            id=usuario_json.get('id'),  
            nombre=usuario_json.get('nombre'),
            rol=usuario_json.get('rol'),
            estado=usuario_json.get('estado', 'activo')  
        )
