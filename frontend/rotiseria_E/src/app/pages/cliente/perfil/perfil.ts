import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../../components/navbar/navbar';
import { ProfileCardComponent, UserProfile } from '../../../components/profile-card/profile-card';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    ProfileCardComponent 
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil { 
  
  currentUser: UserProfile = {
    name: 'Lola Argenta',
    email: 'LolaArgenta123@gmail.com',
    phone: '+261 1234567',
    avatar: 'assets/perfil/avatar.png',
    role: 'cliente' 
  };

  constructor() { }
}