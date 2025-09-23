import { Component } from '@angular/core';
import { MenuBotonComponent } from '../componentes/menu-boton/menu-boton'; 
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuBotonComponent,
    RouterLink // Añade RouterLink a la lista de imports
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu { }