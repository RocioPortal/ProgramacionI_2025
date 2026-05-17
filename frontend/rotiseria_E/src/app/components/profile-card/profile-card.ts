import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'cliente' | 'empleado' | 'administrador';
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() user: UserProfile | null = null;

  modoEdicion = false;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  editNombre = '';
  editEmail = '';
  editTelefono = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatosDesdeBackend();
  }

  cargarDatosDesdeBackend(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.userService.getUserById(Number(userId)).subscribe({
      next: (userData: any) => {
        if (this.user) {
          this.user.name = userData.nombre;
          this.user.email = userData.email;
          this.user.phone = userData.telefono || '';
        }
      },
      error: (err: any) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }

  activarEdicion(): void {
    this.editNombre = this.user?.name || '';
    this.editEmail = this.user?.email || '';
    this.editTelefono = this.user?.phone || '';
    this.mensajeExito = '';
    this.mensajeError = '';
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
  }

  guardarCambios(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.guardando = true;
    this.mensajeError = '';

    const datos: any = {
      nombre: this.editNombre,
      email: this.editEmail,
      telefono: this.editTelefono
    };

    this.userService.updateUser(Number(userId), datos).subscribe({
      next: () => {
        if (this.user) {
          this.user.name = this.editNombre;
          this.user.email = this.editEmail;
          this.user.phone = this.editTelefono;
        }
        this.guardando = false;
        this.modoEdicion = false;
        this.mensajeExito = '¡Datos actualizados correctamente!';
        setTimeout(() => this.mensajeExito = '', 3000);
      },
      error: (err: any) => {
        this.guardando = false;
        this.mensajeError = 'Hubo un error al guardar. Verificá los datos.';
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}