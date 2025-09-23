import { Component } from '@angular/core';
import { MenuBotonComponent } from '../componentes/menu-boton/menu-boton'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuBotonComponent,
    RouterLink 
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu { }