import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-boton-crearpromo',
  standalone: true,
  templateUrl: './boton-crearpromo.html',
  styleUrl: './boton-crearpromo.css'
})
export class BotonCrearpromoComponent {
  @Output() onClick = new EventEmitter<void>();
}