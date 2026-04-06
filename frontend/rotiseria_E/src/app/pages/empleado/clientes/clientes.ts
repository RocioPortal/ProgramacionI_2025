import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user'; // <-- Servicio
import { User } from '../../../interfaces/user.interfaces'; // <-- Interfaz

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  
  users: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  terminoBusqueda: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    const filters = {
      rol: 'USER',
      nombre: this.terminoBusqueda
    };

    this.userService.getUsers(this.currentPage, this.perPage, filters).subscribe(response => {
      this.users = response.usuarios;
      this.totalPages = response.pages;
    });
  }

  // --- ¡NUEVA FUNCIÓN AÑADIDA! ---
  /**
   * Cambia el estado de un usuario (activo <-> suspendido)
   */
  toggleEstado(user: User): void {
    const nuevoEstado = user.estado === 'activo' ? 'suspendido' : 'activo';
    const accion = nuevoEstado === 'suspendido' ? 'suspender' : 'reactivar';

    if (confirm(`¿Estás seguro de que deseas ${accion} a ${user.nombre}?`)) {
      
      // Llamamos al servicio para actualizar solo el estado
      this.userService.updateUser(user.id_user, { estado: nuevoEstado }).subscribe({
        next: () => {
          alert(`Cliente ${accion} con éxito.`);
          this.loadClientes(); // Recargamos la lista para ver el cambio
        },
        error: (err) => {
          alert('Error al actualizar el estado del cliente.');
          console.error(err);
        }
      });
    }
  }

  // --- PAGINACIÓN ---
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadClientes();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}