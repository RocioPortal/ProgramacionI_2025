from .. import db

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    
    notificaciones = db.relationship('Notificacion', back_populates='user', cascade="all, delete", single_parent=True)
    valoraciones = db.relationship('Valoracion', back_populates='usuario', cascade="all, delete", single_parent=True)

    def to_json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado
        }
