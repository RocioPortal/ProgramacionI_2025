import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Definimos una interfaz para los datos del usuario
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'cliente' | 'empleado' | 'administrador'; // El rol es obligatorio
}

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css']
})
export class ProfileCardComponent {
  // Recibimos los datos del usuario desde el componente padre
  @Input() user: UserProfile | null = null;
}