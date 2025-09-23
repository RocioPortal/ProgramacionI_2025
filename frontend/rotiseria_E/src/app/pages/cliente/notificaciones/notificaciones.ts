import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones {

}