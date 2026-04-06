import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importamos ReactiveFormsModule
import { RouterLink } from '@angular/router';

import { UserService } from '../../../services/user'; // <-- Servicio real
import { User } from '../../../interfaces/user.interfaces';    // <-- Interfaz real
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterLink,
    BotonVolverComponent
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  mostrarLista: boolean = true;

  users: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10; 

  filtroActual: 'USER' | 'EMPLEADO' | 'ADMIN' = 'USER'; 
  terminoBusqueda: string = '';

  userForm: FormGroup;
  usuarioSeleccionado: User | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id_user: [null],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      rol: ['USER', Validators.required],
      estado: ['activo', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const filters = {
      rol: this.filtroActual,
      nombre: this.terminoBusqueda
    };

    this.userService.getUsers(this.currentPage, this.perPage, filters).subscribe(response => {
      this.users = response.usuarios;
      this.totalPages = response.pages;
    });
  }

  cambiarTipo(tipo: 'USER' | 'EMPLEADO' | 'ADMIN') {
    this.filtroActual = tipo;
    this.currentPage = 1; 
    this.loadUsers();
  }

  filtrarUsuarios() {
    this.currentPage = 1;
    this.loadUsers();
  }

  editarUsuario(usuario: User) {
    this.usuarioSeleccionado = usuario;
    this.userForm.patchValue(usuario); 
    this.mostrarLista = false;
  }

  guardarCambios() {
    if (this.userForm.invalid || !this.usuarioSeleccionado) return;

    const id = this.usuarioSeleccionado.id_user;
    const userData = this.userForm.value;

    this.userService.updateUser(id, userData).subscribe({
      next: () => {
        alert('Usuario actualizado con éxito.');
        this.cancelarEdicion();
        this.loadUsers();
      },
      error: (err) => alert('Error al actualizar el usuario.')
    });
  }

  cancelarEdicion() {
    this.mostrarLista = true;
    this.usuarioSeleccionado = null;
    this.userForm.reset();
  }
  
  eliminarUsuario(id: number, nombre: string) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`)) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado con éxito.');
          this.loadUsers();
        },
        error: (err) => alert('Error al eliminar el usuario.')
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}