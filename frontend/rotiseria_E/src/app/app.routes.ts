import { Routes } from '@angular/router';

// CLIENTE
import { Menu } from './pages/cliente/menu/menu';
import { Carrito } from './pages/cliente/carrito/carrito';
import { Perfil } from './pages/cliente/perfil/perfil';
import { Notificaciones } from './pages/cliente/notificaciones/notificaciones';
import { Todos } from './pages/cliente/todos/todos';
import { Top } from './pages/cliente/top/top';
import { Pastas } from './pages/cliente/pastas/pastas';
import { EntrePanes } from './pages/cliente/entre-panes/entre-panes';
import { Calificar } from './pages/cliente/calificar/calificar';
import { Mensajepedido } from './pages/cliente/mensajepedido/mensajepedido';
import { Mensajecalificar } from './pages/cliente/mensajecalificar/mensajecalificar';
import { Empanadas } from './pages/cliente/empanadas/empanadas';
import { Bebidas } from './pages/cliente/bebidas/bebidas';
import { Pizzas } from './pages/cliente/pizzas/pizzas';
import { Caserito } from './pages/cliente/caserito/caserito';

// Generales
import { Registro } from './pages/general/registro/registro';
import { Login } from './pages/general/login/login';
import { Bienvenida } from './pages/general/bienvenida/bienvenida';

// (Cuando existan, descomentar e importar)
// import { Menu as MenuEmpleado } from './pages/empleado/menu/menu';
// import { Menu as MenuAdmin } from './pages/administrador/menu/menu';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },

  // Generales
  { path: 'bienvenida', component: Bienvenida },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  // ===== Rutas cliente (sin prefijo) - tus rutas originales =====
  { path: 'menu', component: Menu },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil },
  { path: 'notificaciones', component: Notificaciones },
  { path: 'todos', component: Todos },
  { path: 'top', component: Top },
  { path: 'pastas', component: Pastas },
  { path: 'entre_panes', component: EntrePanes },
  { path: 'calificar', component: Calificar },
  { path: 'mensajepedido', component: Mensajepedido },
  { path: 'mensajecalificar', component: Mensajecalificar },
  { path: 'empanadas', component: Empanadas },
  { path: 'bebidas', component: Bebidas },
  { path: 'pizzas', component: Pizzas },
  { path: 'caserito', component: Caserito },

  // ===== ALIAS con prefijo "/cliente" (para que el login/registro funcionen con role/menu) =====
  { path: 'cliente/menu', component: Menu },
  { path: 'cliente/carrito', component: Carrito },
  { path: 'cliente/perfil', component: Perfil },
  { path: 'cliente/notificaciones', component: Notificaciones },
  { path: 'cliente/todos', component: Todos },
  { path: 'cliente/top', component: Top },
  { path: 'cliente/pastas', component: Pastas },
  { path: 'cliente/entre_panes', component: EntrePanes },
  { path: 'cliente/calificar', component: Calificar },
  { path: 'cliente/mensajepedido', component: Mensajepedido },
  { path: 'cliente/mensajecalificar', component: Mensajecalificar },
  { path: 'cliente/empanadas', component: Empanadas },
  { path: 'cliente/bebidas', component: Bebidas },
  { path: 'cliente/pizzas', component: Pizzas },
  { path: 'cliente/caserito', component: Caserito },

  // ===== Empleado / Administrador (agregar cuando existan) =====
  // { path: 'empleado/menu', component: MenuEmpleado },
  // { path: 'administrador/menu', component: MenuAdmin },

  // catch-all → redirigir a bienvenida si no existe la ruta
  { path: '**', redirectTo: 'bienvenida' }
];


// ADMINISTRADOR: 

// Componentes de administrador
import { MenuComponent } from './pages/administrador/menu/menu';
import { PedidosComponent } from './pages/administrador/pedidos/pedidos';
import { UsuariosComponent } from './pages/administrador/usuarios/usuarios';
import { PromocionesComponent } from './pages/administrador/promociones/promociones';
import { PerfilComponent } from './pages/administrador/perfil/perfil';
import { ProductosComponent } from './pages/administrador/productos/productos';

export const routes: Routes = [
  // Rutas de administrador
  { path: 'administrador/menu', component: MenuComponent },
  { path: 'administrador/pedidos', component: PedidosComponent },
  { path: 'administrador/usuarios', component: UsuariosComponent },
  { path: 'administrador/promociones', component: PromocionesComponent },
  { path: 'administrador/productos', component: ProductosComponent },
  { path: 'administrador/perfil', component: PerfilComponent },
  
  { path: '', redirectTo: 'administrador/menu', pathMatch: 'full' },
  { path: '**', redirectTo: 'administrador/menu' }
];




//EMPLEADO:

import { Menu } from './pages/empleado/menu/menu';
import { Pedidos } from './pages/empleado/pedidos/pedidos';
import { PedidoInfo } from './pages/empleado/pedido-info/pedido-info';
import { PedidoNuevo } from './pages/empleado/pedido-nuevo/pedido-nuevo';
import { Stock } from './pages/empleado/stock/stock';
import { StockProductos } from './pages/empleado/stock-productos/stock-productos';
import { Clientes } from './pages/empleado/clientes/clientes';
import { ModificarCliente } from './pages/empleado/modificar-cliente/modificar-cliente';
import { Perfil } from './pages/empleado/perfil/perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'empleado/menu', pathMatch: 'full' },

  { path: 'empleado/menu', component: Menu },
  { path: 'empleado/pedidos', component: Pedidos },
  { path: 'empleado/pedido-info', component: PedidoInfo },
  { path: 'empleado/pedido-nuevo', component: PedidoNuevo },
  { path: 'empleado/stock', component: Stock },
  { path: 'empleado/stock-productos', component: StockProductos },
  { path: 'empleado/clientes', component: Clientes },
  { path: 'empleado/modificar-cliente', component: ModificarCliente },
  { path: 'empleado/perfil', component: Perfil },

  { path: '**', redirectTo: 'empleado/menu' }
];
