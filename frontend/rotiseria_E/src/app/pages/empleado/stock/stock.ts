import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { getProductImage } from '../../../utils/image-helper'; 
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interfaces';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    FormsModule  
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.css'
})
export class Stock implements OnInit {

  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10; 
  public getProductImage = getProductImage; 
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.perPage).subscribe(response => {
      this.products = response.productos;
      this.totalPages = response.pages;
    });
  }

  updateDisponibilidad(product: Product, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.productService.updateProduct(product.id_prod, { disponible: isChecked }).subscribe({
      next: () => {
        product.disponible = isChecked; 
        console.log(`Estado de ${product.nombre} actualizado a ${isChecked}`);
      },
      error: (err) => {
        alert('Error al actualizar el producto.');
        (event.target as HTMLInputElement).checked = !isChecked;
      }
    });
  }

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