import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './perfil-logout.html',
  styleUrl: './perfil-logout.css'
})
export class PerfilLogoutComponent {
  @Input() text: string = '';
  @Input() routerLink: string = '';
}