from .. import mailsender       #trae el mail sender que configure en mi main/init (inicialicè)
from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException 

def sendMail(to, subject, template, **kwargs):            # objeto mensaje (trae data del mail)  
    msg = Message(
        subject,
        sender=current_app.config['FLASKY_MAIL_SENDER'],   #busca la cuenta de Gmail que dejaste guardada en tus variables de entorno
        recipients=to  
    )
    try:
        msg.body = render_template(template + '.txt', **kwargs)  # se renderizan los arcivos txt y html inyectando las variables
        msg.html = render_template(template + '.html', **kwargs)  
        # Envío del correo
        result = mailsender.send(msg)
    except SMTPException as e:                         # excepcion si falla y envia mensaje
        print(str(e))  
        return "Mail delivery failed"
    return True