from main import db


class Notificacion(db.Model):
    __tablename__ = 'notificaciones'
    
    id_notificacion = db.Column(db.Integer, primary_key = True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable = False)
    mensaje = db.Column(db.Text, nullable = False)
    
    user = db.relationship('Usuario', back_populates='notificaciones')  
    
    def to_json(self):
       notificaciones_json = {
           'id_notificaciones' : self.id_notificacion,
           'id_user' : self.id_user,
           'mensaje' : str(self.mensaje),
           'usuario': self.user.nombre
       }
      
       return notificaciones_json
   
    @staticmethod
    def from_json(json_data):
        return Notificacion(
            user_id=json_data.get('user_id'),
            mensaje=json_data.get('mensaje')
        )