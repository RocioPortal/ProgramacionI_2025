from .. import mailsender  # Importa el objeto mailsender configurado en el __init__.py
from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException  # Manejo de errores de envío de correo

def sendMail(to, subject, template, **kwargs):
    """
    Función para enviar correos electrónicos.
    :param to: Lista de destinatarios.
    :param subject: Asunto del correo.
    :param template: Nombre del archivo de plantilla (sin extensión).
    :param kwargs: Variables para renderizar la plantilla.
    :return: True si el correo se envió correctamente, mensaje de error en caso contrario.
    """
    # Configuración del correo
    msg = Message(
        subject,
        sender=current_app.config['FLASKY_MAIL_SENDER'],  # Remitente configurado en el .env
        recipients=to  # Lista de destinatarios
    )
    try:
        # Creación del cuerpo del mensaje
        msg.body = render_template(template + '.txt', **kwargs)  # Versión de texto plano
        msg.html = render_template(template + '.html', **kwargs)  # Versión HTML
        # Envío del correo
        result = mailsender.send(msg)
    except SMTPException as e:
        print(str(e))  # Imprime el error en la consola
        return "Mail delivery failed"
    return True