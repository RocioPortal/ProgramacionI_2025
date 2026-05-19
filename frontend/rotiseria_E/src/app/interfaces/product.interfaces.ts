
export interface Product {
  id_prod: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  img?: string;
  descuento?: number;
}

export interface PaginatedProducts {
  productos: Product[];
  total: number;
  pages: number;
  page: number;
  per_page: number;
}