import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Importaciones de componentes ---
import { Navbar } from '../../../components/navbar/navbar';
import { ProfileCardComponent, UserProfile } from '../../../components/profile-card/profile-card';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    ProfileCardComponent // <-- Añadimos el componente reutilizable
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil { // Asumiendo que tu clase se llama Perfil
  
  // Datos de ejemplo para el cliente
  currentUser: UserProfile = {
    name: 'Lola Argenta',
    email: 'LolaArgenta123@gmail.com',
    phone: '+261 1234567',
    avatar: 'assets/perfil/avatar.png',
    role: 'cliente' // <-- El rol es clave
  };

  constructor() { }
}