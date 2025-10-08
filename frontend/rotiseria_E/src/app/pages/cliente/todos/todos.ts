import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';

// --- IMPORTACIONES QUE FALTABAN ---
import { ProductListComponent } from '../../../components/product-list/product-list';
import { Navbar } from '../../../components/navbar/navbar';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent, // <-- Añadido
    Navbar              // <-- Añadido
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.css'
})
export class TodosPage {
  products: Product[] = [];
  
  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}