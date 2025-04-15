from main import db

class Valoracion(db.Model):
    __tablename__ = 'valoraciones'

    id_valoracion = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, nullable=False)
    id_prod = db.Column(db.Integer, nullable=False)
    calificacion = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text, nullable=False)

    def get_json(self):
        valoraciones_json = {
            'id_valoracion': self.id_valoracion,
            'id_user': self.id_user,
            'id_prod': self.id_prod,
            'calificacion': self.calificacion,
            'comentario': str(self.comentario),
        }
        return valoraciones_json

    @staticmethod
    def from_json(json_data):
        return Valoracion(
            id_user=json_data.get('id_user'),
            id_prod=json_data.get('id_prod'),
            calificacion=json_data.get('calificacion'),
            comentario=json_data.get('comentario')
        )
    
       