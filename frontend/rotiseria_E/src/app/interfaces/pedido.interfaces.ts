import { Product } from "./product.interfaces";
import { User } from "./user.interfaces";

export interface OrdenItem {
  id_orden: number;
  cantidad: number;
  precio_total: number;
  especificaciones: string;
  producto: Product; 
}

export interface Pedido {
  id_pedido: number;
  id_user: number;
  nombre: string;
  telefono: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado';
  fecha: string; 
  ordenes: OrdenItem[];
  usuario?: User;
  total: number;
}

export interface PaginatedPedidos {
  pedidos: Pedido[];
  total: number;
  pages: number;
  page: number;
  per_page: number;
}

export interface CrearOrdenItem {
  id_prod: number;
  cantidad: number;
  especificaciones?: string;
}

export interface CrearPedidoRequest {
  id_user: number;
  nombre: string;
  telefono: string;
  productos: CrearOrdenItem[];
}

export interface CartItem {
  id_prod: number;
  nombre: string;
  precio: number;
  img: string; 
  cantidad: number;
  especificaciones: string;
}

export interface PaginatedOrdenes {
  ordenes: OrdenItem[];
  total: number;
  pages: number;
  page: number;
  per_page: number;
}