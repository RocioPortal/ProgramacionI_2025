import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css']
})
export class ProfileCardComponent {
  @Input() user: UserProfile | null = null;
}