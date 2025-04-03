from flask_restful import Resource
from flask import request

PRODUCTOS = {
    1: {'nombre': 'Hamburguesa', 'precio': 10000},
    2: {'nombre': 'Pizza', 'precio': 7000}
}
# Función para verificar permisos
def verificar_permiso(roles_requeridos):
    # Simulando que obtenemos el rol desde el encabezado o algún otro medio
    rol_usuario = 'ADMIN'  # Cambia esto por la lógica que uses para obtener el rol del usuario.
    
    if rol_usuario not in roles_requeridos:
        return False, "No tienes permiso para realizar esta acción", 403
    return True, "", 200

# Recurso para un producto específico
class Producto(Resource):
    def get(self, id):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        return PRODUCTOS.get(int(id), ('El id es inexistente', 404))
    
    def put(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in PRODUCTOS:
            data = request.get_json()
            PRODUCTOS[int(id)].update(data)
            return 'Producto editado con éxito', 201
        return 'El id que intentan editar es inexistente', 404
    
    def delete(self, id):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        if int(id) in PRODUCTOS:
            del PRODUCTOS[int(id)]
            return 'Producto eliminado con éxito', 200
        return 'El id a eliminar es inexistente', 404

# Recurso para la colección de productos
class Productos(Resource):
    def get(self):
        permitido, mensaje, codigo = verificar_permiso(['USER', 'ADMIN', 'ENCARGADO'])
        if not permitido:
            return mensaje, codigo
        
        return PRODUCTOS
    
    def post(self):
        permitido, mensaje, codigo = verificar_permiso(['ADMIN'])
        if not permitido:
            return mensaje, codigo
        
        data = request.get_json()
        id = int(max(PRODUCTOS.keys())) + 1 if PRODUCTOS else 1
        PRODUCTOS[id] = data
        return PRODUCTOS[id], 201