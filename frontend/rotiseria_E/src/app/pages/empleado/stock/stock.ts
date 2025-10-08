import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ProductListComponent } from '../../../components/product-list/product-list';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductListComponent // <-- Lo importamos para poder usarlo en el HTML
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css'
})
export class Stock {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}