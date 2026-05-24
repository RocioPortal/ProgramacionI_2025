import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PedidoService } from '../../../services/pedido';
import { UserService } from '../../../services/user';
import { Product } from '../../../interfaces/product.interfaces';
import { CartItem, CrearOrdenItem } from '../../../interfaces/pedido.interfaces';

@Component({
  selector: 'app-pedido-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedido-nuevo.html',
  styleUrl: './pedido-nuevo.css'
})
export class PedidoNuevo implements OnInit {

  paso = 1;

  busquedaEmail = '';
  clienteEncontrado: any = null;
  errorCliente = '';
  buscando = false;

  productos: Product[] = [];
  cargandoProductos = false;
  busquedaProducto = '';

  carrito: CartItem[] = [];

  enviando = false;
  error = '';

  constructor(
    private productService: ProductService,
    private pedidoService: PedidoService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargandoProductos = true;
    this.productService.getProducts(1, 100).subscribe({
      next: (res) => {
        this.productos = res.productos.filter(p => p.disponible);
        this.cargandoProductos = false;
      },
      error: () => { this.cargandoProductos = false; }
    });
  }

  buscarCliente(): void {
    if (!this.busquedaEmail.trim()) return;
    this.buscando = true;
    this.errorCliente = '';
    this.clienteEncontrado = null;

    this.userService.getUsers(1, 100).subscribe({
      next: (res: any) => {
        const usuarios = res.usuarios || res;
        const encontrado = usuarios.find((u: any) =>
          u.email?.toLowerCase() === this.busquedaEmail.toLowerCase().trim()
        );
        if (encontrado) {
          this.clienteEncontrado = encontrado;
        } else {
          this.errorCliente = 'No se encontró ningún cliente con ese email.';
        }
        this.buscando = false;
      },
      error: () => {
        this.errorCliente = 'Error al buscar el cliente.';
        this.buscando = false;
      }
    });
  }

  siguientePaso(): void {
    if (this.paso === 1 && this.clienteEncontrado) {
      this.paso = 2;
    } else if (this.paso === 2 && this.carrito.length > 0) {
      this.paso = 3;
    }
  }

  volverPaso(): void {
    if (this.paso > 1) this.paso--;
  }

  // Productos filtrados por búsqueda
  get productosFiltrados(): Product[] {
    if (!this.busquedaProducto.trim()) return this.productos;
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busquedaProducto.toLowerCase())
    );
  }

  getCantidad(id_prod: number): number {
    return this.carrito.find(c => c.id_prod === id_prod)?.cantidad || 0;
  }

  agregar(producto: Product): void {
    const item = this.carrito.find(c => c.id_prod === producto.id_prod);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({
        id_prod: producto.id_prod,
        nombre: producto.nombre,
        precio: producto.precio,
        img: producto.img || '',
        cantidad: 1,
        especificaciones: '',
        descuento: producto.descuento || 0
      });
    } 
  }

  quitar(producto: Product): void {
    const idx = this.carrito.findIndex(c => c.id_prod === producto.id_prod);
    if (idx === -1) return;
    if (this.carrito[idx].cantidad > 1) {
      this.carrito[idx].cantidad--;
    } else {
      this.carrito.splice(idx, 1);
    }
  }

  get total(): number {
    return this.carrito.reduce((acc, item) => {
      const precioFinal = item.descuento && item.descuento > 0
        ? item.precio - (item.precio * item.descuento / 100)
        : item.precio;
      return acc + precioFinal * item.cantidad;
    }, 0);
  }

  confirmarPedido(): void {
    if (!this.clienteEncontrado || this.carrito.length === 0) return;
    this.enviando = true;
    this.error = '';

    const productos: CrearOrdenItem[] = this.carrito.map(item => ({
      id_prod: item.id_prod,
      cantidad: item.cantidad,
      especificaciones: item.especificaciones || ''
    }));

    const pedido = {
      id_user: this.clienteEncontrado.id_user,
      nombre: this.clienteEncontrado.nombre,
      telefono: this.clienteEncontrado.telefono || '',
      productos
    };

    this.pedidoService.createPedido(pedido).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/empleado/pedidos']);
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error al crear el pedido. Intentá de nuevo.';
      }
    });
  }
}