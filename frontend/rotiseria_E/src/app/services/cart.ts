import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../interfaces/pedido.interfaces';
import { Product } from '../interfaces/product.interfaces';
import { getProductImage } from '../utils/image-helper';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.itemsSubject.next(JSON.parse(storedCart));
    }
  }

  private saveCart(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  addProduct(product: Product): void {
    const items = this.itemsSubject.getValue();
    const existingItem = items.find(item => item.id_prod === product.id_prod);

    if (existingItem) {
      existingItem.cantidad++;
    } else {
      items.push({
        id_prod: product.id_prod,
        nombre: product.nombre,
        precio: product.precio,
        img: getProductImage(product.nombre), 
        cantidad: 1,
        especificaciones: '',
        // ACÁ LE ENSEÑAMOS A SUBIR EL DESCUENTO AL CARRITO
        descuento: (product as any).descuento || 0 
      });
    }
    this.saveCart(items);
  }

  updateQuantity(id_prod: number, newQuantity: number): void {
    const items = this.itemsSubject.getValue();
    const item = items.find(item => item.id_prod === id_prod);
    if (item) {
      item.cantidad = newQuantity;
      if (item.cantidad <= 0) {
        this.removeItem(id_prod); 
      } else {
        this.saveCart(items);
      }
    }
  }

  removeItem(id_prod: number): void {
    const items = this.itemsSubject.getValue().filter(item => item.id_prod !== id_prod);
    this.saveCart(items);
  }

  getSubtotal(): number {
    return this.itemsSubject.getValue().reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  getTotalItems(): number {
    return this.itemsSubject.getValue().reduce((total, item) => total + item.cantidad, 0);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }
}