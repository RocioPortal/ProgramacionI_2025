// Inside boton-volver.ts
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boton-volver',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './boton-volver.html',
  styleUrl: './boton-volver.css'
})
export class BotonVolverComponent { // Make sure 'export' is here
  @Input() text: string = '';
  @Input() routerLink: string = '';
}