import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido'; 
import { Pedido, PaginatedPedidos } from '../../../interfaces/pedido.interfaces'; 

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {
  
  pedidos: Pedido[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  estadoFiltro: string | null = null; 

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos(this.currentPage, this.perPage, this.estadoFiltro)
      .subscribe((response: PaginatedPedidos) => { 
        this.pedidos = response.pedidos;
        this.totalPages = response.pages;
      });
  }

  filtrarPendientes(): void {
    if (this.estadoFiltro === 'Pendiente') {
      this.estadoFiltro = null;
    } else {
      this.estadoFiltro = 'Pendiente';
    }
    
    this.currentPage = 1;
    this.loadPedidos();
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          alert('Pedido eliminado');
          this.loadPedidos(); // Esto ya funciona bien
        },
        error: (err) => alert('Error al eliminar el pedido')
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPedidos();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
