import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Cambio: Importa RouterLink
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';
import { BotonCrearpromoComponent } from '../componentes/boton-crearpromo/boton-crearpromo';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // Cambio: Usa RouterLink aquí
    BotonVolverComponent,
    BotonCrearpromoComponent
  ],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class PromocionesComponent {
  mostrarLista: boolean = true;

  showForm() {
    this.mostrarLista = false;
  }

  showList() {
    this.mostrarLista = true;
  }
}