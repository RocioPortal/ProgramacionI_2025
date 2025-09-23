import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-boton',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-boton.html', // Aquí se enlaza el HTML
  styleUrl: './menu-boton.css'
})
export class MenuBotonComponent {
  @Input() text: string = '';
  @Input() routerLink: string = '';
}