import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Navbar } from '../../../components/navbar/navbar';

// 1. ACÁ LE ENSEÑAMOS A ANGULAR DÓNDE ESTÁ EL COMPONENTE
import { ProductListComponent } from '../../../components/product-list/product-list'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  // 2. ACÁ LO INYECTAMOS PARA QUE EL HTML LO PUEDA USAR
  imports: [CommonModule, RouterLink, Navbar, ProductListComponent], 
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {

  categories = [
    { id: 'todos', name: 'Todos', imageUrl: 'assets/logoprincipal.png' },
    { id: 'entre_panes', name: 'Entre Panes', imageUrl: 'assets/menu/entre_panes/hamburguesa.png' },
    { id: 'pizzas', name: 'Pizzas', imageUrl: 'assets/menu/pizzas/logo.png' },
    { id: 'empanadas', name: 'Empanadas', imageUrl: 'assets/menu/empanadas/logo.png' },
    { id: 'pastas', name: 'Pastas', imageUrl: 'assets/menu/pastas/ravioles.png' },
    { id: 'bebidas', name: 'Bebidas', imageUrl: 'assets/menu/bebidas/gaseosa.png' }
  ];

  productos: any[] = [];
  productosFiltrados: any[] = [];
  filtroNombre: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getProducts(1, 100).subscribe({
      next: (data: any) => {
        this.productos = data.productos || data;
        this.productosFiltrados = this.productos;
      },
      error: (error) => console.error('Error al cargar productos:', error)
    });
  }

  aplicarFiltros(texto: string): void {
    this.filtroNombre = texto; 
    
    if (this.filtroNombre.trim() === '') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }
}