import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-productos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stock-productos.html',
  styleUrl: './stock-productos.css'
})
export class StockProductos {
  inc(input: HTMLInputElement) {
    input.stepUp();
  }
  dec(input: HTMLInputElement) {
    if (Number(input.value) > 0) {
      input.stepDown();
    }
  }
}