import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pizzas.html',
  styleUrl: './pizzas.css'
})
export class Pizzas {

}
