import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart';
import { PedidoService } from '../../../services/pedido';
import { AuthService } from '../../../services/auth';
import { UserService } from '../../../services/user';
import { CartItem, CrearOrdenItem, CrearPedidoRequest } from '../../../interfaces/pedido.interfaces';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {

  cartItems$: Observable<CartItem[]>;

  subtotal: number = 0;
  descuentoTotal: number = 0;
  totalFinal: number = 0;

  nombreCliente: string = '';
  telefonoCliente: string = '';

  constructor(
    public cartService: CartService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.items$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      this.descuentoTotal = items.reduce((acc, item) => {
        const desc = (item as any).descuento || 0;
        return acc + ((item.precio * desc / 100) * item.cantidad);
      }, 0);
      this.totalFinal = this.subtotal - this.descuentoTotal;
    });

    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (userData: any) => {
          this.nombreCliente = userData.nombre || '';
          this.telefonoCliente = userData.telefono || '';
        },
        error: () => {}
      });
    }
  }

  updateQuantity(id_prod: number, newQuantity: number): void {
    this.cartService.updateQuantity(id_prod, +newQuantity);
  }

  removeItem(id_prod: number): void {
    this.cartService.removeItem(id_prod);
  }

  confirmarPedido(): void {
    const items = this.cartService.getItems();
    if (items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Error de autenticación. Por favor, inicia sesión de nuevo.');
      return;
    }

    const productosParaBackend: CrearOrdenItem[] = items.map(item => ({
      id_prod: item.id_prod,
      cantidad: item.cantidad,
      especificaciones: item.especificaciones
    }));

    const nuevoPedido: CrearPedidoRequest = {
      id_user: +userId,
      nombre: this.nombreCliente,
      telefono: this.telefonoCliente,
      productos: productosParaBackend
    };

    this.pedidoService.createPedido(nuevoPedido).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/cliente/mensaje', 'pedido']);
      },
      error: (err) => {
        console.error('Error al crear el pedido:', err);
        this.router.navigate(['/cliente/mensaje', 'error']);
      }
    });
  }
}