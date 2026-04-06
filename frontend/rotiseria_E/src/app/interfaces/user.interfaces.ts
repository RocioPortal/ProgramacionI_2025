export interface User {
  id_user: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: 'USER' | 'ADMIN' | 'EMPLEADO';
  estado: 'activo' | 'suspendido';
}

export interface PaginatedUsers {
  usuarios: User[];
  total: number;
  pages: number;
  page: number;
  per_page: number;
}