import { Routes } from '@angular/router';

// --- Guards---
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

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
import { CategoryPage } from './components/category-page/category-page';
import { TodosPage } from './pages/cliente/todos/todos';
import { MensajePage } from './pages/cliente/mensaje/mensaje';

// --- Vistas de Administrador ---
import { Menu as AdminMenu } from './pages/administrador/menu/menu';
import { Pedidos as AdminPedidos } from './pages/administrador/pedidos/pedidos';
import { Usuarios } from './pages/administrador/usuarios/usuarios';
import { Promociones } from './pages/administrador/promociones/promociones';
import { Perfil as AdminPerfil } from './pages/administrador/perfil/perfil';
import { Productos } from './pages/administrador/productos/productos';

// --- Vistas de Empleado ---
import { Menu as EmpleadoMenu } from './pages/empleado/menu/menu';
import { Pedidos as EmpleadoPedidos } from './pages/empleado/pedidos/pedidos';
import { PedidoInfo } from './pages/empleado/pedido-info/pedido-info';
import { PedidoNuevo } from './pages/empleado/pedido-nuevo/pedido-nuevo';
import { Clientes } from './pages/empleado/clientes/clientes';
import { Perfil as EmpleadoPerfil } from './pages/empleado/perfil/perfil';
import { Stock } from './pages/empleado/stock/stock';

export const routes: Routes = [
  // --- Rutas Generales (Públicas) ---
  { path: 'bienvenida', component: Bienvenida },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'index', component: Index },
  { path: 'bienvenida/:step', component: BienvenidaPage },

  // --- Rutas de Cliente ---
  { path: 'cliente/menu', component: ClienteMenu, canActivate: [authGuard, roleGuard(['USER', 'ADMIN', 'EMPLEADO'])] },
  { path: 'cliente/carrito', component: Carrito, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/perfil', component: ClientePerfil, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/notificaciones', component: Notificaciones, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/top', component: Top, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/calificar', component: Calificar, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/mensaje/:type', component: MensajePage, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/categoria/:id', component: CategoryPage, canActivate: [authGuard, roleGuard(['USER'])] },
  { path: 'cliente/todos', component: TodosPage, canActivate: [authGuard, roleGuard(['USER'])] },

  // --- Rutas de Administrador ---
  { path: 'administrador/menu', component: AdminMenu, canActivate: [authGuard, roleGuard(['ADMIN'])] },
  { path: 'administrador/pedidos', component: AdminPedidos, canActivate: [authGuard, roleGuard(['ADMIN'])] },
  { path: 'administrador/usuarios', component: Usuarios, canActivate: [authGuard, roleGuard(['ADMIN'])] },
  { path: 'administrador/promociones', component: Promociones, canActivate: [authGuard, roleGuard(['ADMIN'])] },
  { path: 'administrador/productos', component: Productos, canActivate: [authGuard, roleGuard(['ADMIN'])] },
  { path: 'administrador/perfil', component: AdminPerfil, canActivate: [authGuard, roleGuard(['ADMIN'])] },

  // --- Rutas de Empleado ---
  { path: 'empleado/menu', component: EmpleadoMenu, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },
  { path: 'empleado/pedidos', component: EmpleadoPedidos, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },
  { path: 'empleado/pedido-info/:id', component: PedidoInfo, canActivate: [authGuard, roleGuard(['EMPLEADO', 'ADMIN'])] },
  { path: 'empleado/pedido-nuevo', component: PedidoNuevo, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },
  { path: 'empleado/clientes', component: Clientes, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },
  { path: 'empleado/perfil', component: EmpleadoPerfil, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },
  { path: 'empleado/stock', component: Stock, canActivate: [authGuard, roleGuard(['EMPLEADO'])] },

  // --- Ruta por defecto
  { path: '', redirectTo: 'index', pathMatch: 'full' },  
  { path: '**', redirectTo: 'bienvenida' }  
];