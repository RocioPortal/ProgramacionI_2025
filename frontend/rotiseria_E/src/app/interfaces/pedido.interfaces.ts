import { Product } from "./product.interfaces";  //reflejan lo de to_json_complete que definimos en los modelos -MOLDES-
import { User } from "./user.interfaces";

export interface OrdenItem {     //Se generan y se inventan ahí mismo (plano de arquitecto)
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
  estado: string;
  fecha: string;
  fecha_pedido?: string;
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
  descuento?: number; 
}

export interface PaginatedOrdenes {
  ordenes: OrdenItem[];
  total: number;
  pages: number;
  page: number;
  per_page: number;
}

//Ese archivo de interfaces no tiene memoria, solo saben la forma