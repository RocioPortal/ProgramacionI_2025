import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rotiseria_E');
}

//Importa el motor de navegación, se engancha a la página principal y utiliza el estado reactivo más moderno disponible en el framework.