import { Routes } from '@angular/router';

// --- Vistas Generales ---
import { Registro } from './pages/general/registro/registro';
import { Login } from './pages/general/login/login';
import { Bienvenida } from './pages/general/bienvenida/bienvenida';
import { Index } from './pages/general/index';
import { BienvenidaPage } from './components/bienvenida-page/bienvenida-page';

// --- Vistas de Cliente ---
import { Menu as ClienteMenu } from './pages/cliente/menu/menu';
import { Carrito } from './pages/cliente/carrito/carrito';
import { Perfil as ClientePerfil } from './pages/cliente/perfil/perfil';
import { Notificaciones } from './pages/cliente/notificaciones/notificaciones';
import { Top } from './pages/cliente/top/top';
import { Calificar } from './pages/cliente/calificar/calificar';
import { Mensajepedido } from './pages/cliente/mensajepedido/mensajepedido';
import { Mensajecalificar } from './pages/cliente/mensajecalificar/mensajecalificar';
import { CategoryPage } from './components/category-page/category-page';
import { TodosPage } from './pages/cliente/todos/todos';

// --- Vistas de Administrador ---
import { Menu as AdminMenu } from './pages/administrador/menu/menu';
import { Pedidos as AdminPedidos } from './pages/administrador/pedidos/pedidos';
import { Usuarios } from './pages/administrador/usuarios/usuarios';
import { Promociones } from './pages/administrador/promociones/promociones';
import { Perfil as AdminPerfil } from './pages/administrador/perfil/perfil';
import { Productos } from './pages/administrador/productos/productos'; // <-- CORREGIDO

// --- Vistas de Empleado ---
import { Menu as EmpleadoMenu } from './pages/empleado/menu/menu';
import { Pedidos as EmpleadoPedidos } from './pages/empleado/pedidos/pedidos';
import { PedidoInfo } from './pages/empleado/pedido-info/pedido-info';
import { PedidoNuevo } from './pages/empleado/pedido-nuevo/pedido-nuevo';
import { StockProductos } from './pages/empleado/stock-productos/stock-productos';
import { Clientes } from './pages/empleado/clientes/clientes';
import { ModificarCliente } from './pages/empleado/modificar-cliente/modificar-cliente';
import { Perfil as EmpleadoPerfil } from './pages/empleado/perfil/perfil';
import { Stock } from './pages/empleado/stock/stock'; // <-- CORREGIDO

export const routes: Routes = [
  // --- Rutas Generales ---
  { path: 'bienvenida', component: Bienvenida },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'index', component: Index },
  { path: 'bienvenida/:step', component: BienvenidaPage }, // <-- Ruta dinámica para la nueva página


  // --- Rutas de Cliente ---
  { path: 'cliente/menu', component: ClienteMenu },
  { path: 'cliente/carrito', component: Carrito },
  { path: 'cliente/perfil', component: ClientePerfil },
  { path: 'cliente/notificaciones', component: Notificaciones },
  { path: 'cliente/top', component: Top },
  { path: 'cliente/calificar', component: Calificar },
  { path: 'cliente/mensajepedido', component: Mensajepedido },
  { path: 'cliente/mensajecalificar', component: Mensajecalificar },
  { path: 'cliente/todos', component: TodosPage },
  { path: 'cliente/categoria/:id', component: CategoryPage },
  { path: 'bienvenida/:step', component: BienvenidaPage },

  // --- Rutas de Administrador ---
  { path: 'administrador/menu', component: AdminMenu },
  { path: 'administrador/pedidos', component: AdminPedidos },
  { path: 'administrador/usuarios', component: Usuarios },
  { path: 'administrador/promociones', component: Promociones },
  { path: 'administrador/productos', component: Productos }, // <-- CORREGIDO
  { path: 'administrador/perfil', component: AdminPerfil },
  
  // --- Rutas de Empleado ---
  { path: 'empleado/menu', component: EmpleadoMenu },
  { path: 'empleado/pedidos', component: EmpleadoPedidos },
  { path: 'empleado/pedido-info', component: PedidoInfo },
  { path: 'empleado/pedido-nuevo', component: PedidoNuevo },
  { path: 'empleado/stock-productos', component: StockProductos },
  { path: 'empleado/clientes', component: Clientes },
  { path: 'empleado/modificar-cliente', component: ModificarCliente },
  { path: 'empleado/perfil', component: EmpleadoPerfil },
  { path: 'empleado/stock', component: Stock }, // <-- CORREGIDO
  
  // --- Ruta por defecto y comodín ---
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'bienvenida' }
];