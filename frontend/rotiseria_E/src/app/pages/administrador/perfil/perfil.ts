import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// --- Importaciones de componentes ---
import { ProfileCardComponent, UserProfile } from '../../../components/profile-card/profile-card';
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProfileCardComponent, // <-- Añadimos el componente reutilizable
    BotonVolverComponent
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil { // Asumiendo que tu clase se llama Perfil
  
  // Datos de ejemplo para el administrador
  currentUser: UserProfile = {
    name: 'Pepa Ramos',
    email: 'PepitaRamos@gmail.com',
    phone: '+261 1234567',
    avatar: 'assets/perfil/avatar.png',
    role: 'administrador' // <-- El rol es clave
  };

  constructor() { }
}