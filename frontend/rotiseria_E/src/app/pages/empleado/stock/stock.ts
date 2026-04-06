import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importante
import { FormsModule } from '@angular/forms'; // <-- Importante
import { getProductImage } from '../../../utils/image-helper'; // <-- 1. IMPORTA EL HELPER
// --- Imports de Servicios y Modelos ---
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interfaces';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, // <-- Añadido
    FormsModule   // <-- Añadido
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css'
})
export class Stock implements OnInit {

  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10; // Productos por página
  public getProductImage = getProductImage; // <-- 2. AÑADE ESTA LÍNEA
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // --- 1. CARGAR PRODUCTOS (Paginados) ---
  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.perPage).subscribe(response => {
      this.products = response.productos;
      this.totalPages = response.pages;
    });
  }

  // --- 2. ACTUALIZAR DISPONIBILIDAD (PUT) ---
  updateDisponibilidad(product: Product, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.productService.updateProduct(product.id_prod, { disponible: isChecked }).subscribe({
      next: () => {
        // Actualiza el estado localmente para que se vea el cambio
        product.disponible = isChecked; 
        console.log(`Estado de ${product.nombre} actualizado a ${isChecked}`);
      },
      error: (err) => {
        alert('Error al actualizar el producto.');
        // Revertimos el switch si falla la API
        (event.target as HTMLInputElement).checked = !isChecked;
      }
    });
  }

  // --- 3. PAGINACIÓN ---
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}