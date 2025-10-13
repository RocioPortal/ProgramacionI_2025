import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProfileCardComponent, UserProfile } from '../../../components/profile-card/profile-card';
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProfileCardComponent, 
    BotonVolverComponent
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil { 
  
  currentUser: UserProfile = {
    name: 'Pepa Ramos',
    email: 'PepitaRamos@gmail.com',
    phone: '+261 1234567',
    avatar: 'assets/perfil/avatar.png',
    role: 'administrador' 
  };

  constructor() { }
}