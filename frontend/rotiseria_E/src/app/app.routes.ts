import { Routes } from '@angular/router';

// =================================================================
// --- 1. IMPORTACIONES DE TODOS LOS COMPONENTES ---
// =================================================================

// --- Vistas Generales ---
import { Registro } from './pages/general/registro/registro';
import { Login } from './pages/general/login/login';
import { Bienvenida } from './pages/general/bienvenida/bienvenida';

// --- Vistas de Cliente ---
// (Usamos "as" para renombrar y evitar conflictos)
import { Menu as ClienteMenu } from './pages/cliente/menu/menu';
import { Carrito } from './pages/cliente/carrito/carrito';
import { Perfil as ClientePerfil } from './pages/cliente/perfil/perfil';
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

// --- Vistas de Administrador ---
import { Menu as AdminMenu } from './pages/administrador/menu/menu';
import { Pedidos as AdminPedidos } from './pages/administrador/pedidos/pedidos';
import { Usuarios } from './pages/administrador/usuarios/usuarios';
import { Promociones } from './pages/administrador/promociones/promociones';
import { Productos as AdminProductos } from './pages/administrador/productos/productos';
import { Perfil as AdminPerfil } from './pages/administrador/perfil/perfil';

// --- Vistas de Empleado ---
import { Menu as EmpleadoMenu } from './pages/empleado/menu/menu';
import { Pedidos as EmpleadoPedidos } from './pages/empleado/pedidos/pedidos';
import { PedidoInfo } from './pages/empleado/pedido-info/pedido-info';
import { PedidoNuevo } from './pages/empleado/pedido-nuevo/pedido-nuevo';
import { Stock } from './pages/empleado/stock/stock';
import { StockProductos } from './pages/empleado/stock-productos/stock-productos';
import { Clientes } from './pages/empleado/clientes/clientes';
import { ModificarCliente } from './pages/empleado/modificar-cliente/modificar-cliente';
import { Perfil as EmpleadoPerfil } from './pages/empleado/perfil/perfil';


// =================================================================
// --- 2. UNA ÚNICA LISTA DE RUTAS PARA TODA LA APP ---
// =================================================================
export const routes: Routes = [
  // --- Rutas Generales ---
  { path: 'bienvenida', component: Bienvenida },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  // --- Rutas de Cliente ---
  { path: 'cliente/menu', component: ClienteMenu },
  { path: 'cliente/carrito', component: Carrito },
  { path: 'cliente/perfil', component: ClientePerfil },
  { path: 'cliente/notificaciones', component: Notificaciones },
  { path: 'cliente/todos', component: Todos },
  { path: 'cliente/top', component: Top },
  { path: 'cliente/pastas', component: Pastas },
  { path: 'cliente/entre-panes', component: EntrePanes },
  { path: 'cliente/calificar', component: Calificar },
  { path: 'cliente/mensajepedido', component: Mensajepedido },
  { path: 'cliente/mensajecalificar', component: Mensajecalificar },
  { path: 'cliente/empanadas', component: Empanadas },
  { path: 'cliente/bebidas', component: Bebidas },
  { path: 'cliente/pizzas', component: Pizzas },
  { path: 'cliente/caserito', component: Caserito },

  // --- Rutas de Administrador ---
  { path: 'administrador/menu', component: AdminMenu },
  { path: 'administrador/pedidos', component: AdminPedidos },
  { path: 'administrador/usuarios', component: Usuarios },
  { path: 'administrador/promociones', component: Promociones },
  { path: 'administrador/productos', component: AdminProductos },
  { path: 'administrador/perfil', component: AdminPerfil },
  
  // --- Rutas de Empleado ---
  { path: 'empleado/menu', component: EmpleadoMenu },
  { path: 'empleado/pedidos', component: EmpleadoPedidos },
  { path: 'empleado/pedido-info', component: PedidoInfo },
  { path: 'empleado/pedido-nuevo', component: PedidoNuevo },
  { path: 'empleado/stock', component: Stock },
  { path: 'empleado/stock-productos', component: StockProductos },
  { path: 'empleado/clientes', component: Clientes },
  { path: 'empleado/modificar-cliente', component: ModificarCliente },
  { path: 'empleado/perfil', component: EmpleadoPerfil },
  
  // --- Ruta por defecto y comodín ---
  // Si la URL está vacía, redirige a la bienvenida
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  // Si la URL no coincide con ninguna ruta, redirige a la bienvenida
  { path: '**', redirectTo: 'bienvenida' }
];