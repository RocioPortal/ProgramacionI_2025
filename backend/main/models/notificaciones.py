from main import db


class Notificacion(db.Model):
    __tablename__ = 'notificaciones'
    
    id_notificacion = db.Column(db.Integer, primary_key = True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuario.id_user'), nullable = False)    #clave foranea 
    mensaje = db.Column(db.Text, nullable = False)
    
    usuario = db.relationship('Usuario', back_populates='notificaciones')  #relacion con usuarios
    
    def to_json(self):                 #TRADUCTOR A JSON (Para enviar a Angular)
       notificaciones_json = {
           'id_notificaciones' : self.id_notificacion,
           'id_user' : self.id_user,
           'mensaje' : str(self.mensaje),
           'usuario': self.usuario.nombre  #saca el nombre directo por la relacion de arriba que hicimos
       }
      
       return notificaciones_json
   
    @staticmethod                  #TRADUCTOR DESDE JSON (Para recibir desde Angular o desde tu propio código)
    def from_json(json_data):
        return Notificacion(
        id_user=json_data.get('id_user'),
        mensaje=json_data.get('mensaje')
)