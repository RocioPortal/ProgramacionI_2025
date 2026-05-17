import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/navbar/navbar';
import { ProfileCardComponent, UserProfile } from '../../../components/profile-card/profile-card';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, Navbar, ProfileCardComponent],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  currentUser: UserProfile = {
    name: '',
    email: '',
    phone: '',
    avatar: 'assets/perfil/avatar.png',
    role: 'cliente'
  };
}