import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

}