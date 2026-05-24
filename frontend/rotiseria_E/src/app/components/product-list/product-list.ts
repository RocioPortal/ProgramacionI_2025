import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getProductImage } from '../../utils/image-helper';
import { CartService } from '../../services/cart'; // <-- 1. IMPORTA EL CART SERVICE

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() listStyle: 'card' | 'row' = 'card';
  @Input() userRole: 'cliente' | 'admin' | 'empleado' = 'cliente';
  @Output() productSelect = new EventEmitter<Product>();

  public getProductImage = getProductImage;

  constructor(private cartService: CartService) { }

  onProductClick(product: Product) {
    this.productSelect.emit(product);
  }

  addToCart(product: Product) {
    if (!(product as any).disponible) return;
    this.cartService.addProduct(product);
    alert(`${product.nombre} añadido al carrito!`);
  }
}