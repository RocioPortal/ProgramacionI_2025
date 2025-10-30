import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido'; 
import { Pedido } from '../../../interfaces/pedido.interfaces'; 

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

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos(this.currentPage, this.perPage).subscribe(response => {
      this.pedidos = response.pedidos;
      this.totalPages = response.pages;
    });
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          alert('Pedido eliminado');
          this.loadPedidos(); 
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