import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css'
})
export class Stock {

}