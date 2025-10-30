import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interfaces'; 
import { ProductListComponent } from '../../../components/product-list/product-list';
import { Navbar } from '../../../components/navbar/navbar';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, Navbar],
  templateUrl: './todos.html',
})
export class TodosPage implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 8; 

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