import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() listStyle: 'card' | 'row' = 'row';
  @Input() userRole: 'admin' | 'cliente' | 'empleado' = 'cliente';
  @Output() productSelect = new EventEmitter<Product>();

  onProductClick(product: Product) {
    if (this.userRole === 'admin') {
      this.productSelect.emit(product);
    }
  }
}