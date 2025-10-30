import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver'; 

import { PedidoService } from '../../../services/pedido';
import { Pedido } from '../../../interfaces/pedido.interfaces';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    FormsModule,
    BotonVolverComponent,
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {
  mostrarLista: boolean = true;
  pedidoSeleccionado: Pedido | null = null;

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

  verDetalle(pedido: Pedido): void {
    
    forkJoin({
      pedido: this.pedidoService.getPedidoById(pedido.id_pedido),
      ordenesResponse: this.pedidoService.getOrdenesByPedidoId(pedido.id_pedido)
    }).subscribe({
      next: ({ pedido, ordenesResponse }) => {
        // Combinamos la info
        pedido.ordenes = ordenesResponse.ordenes; 
        pedido.total = ordenesResponse.ordenes.reduce((sum: number, item: any) => sum + item.precio_total, 0);
        
        this.pedidoSeleccionado = pedido;
        this.mostrarLista = false;
      },
      error: (err) => alert('Error al cargar el detalle del pedido.')
    });
  }

  cancelar(): void {
    this.mostrarLista = true;
    this.pedidoSeleccionado = null;
  }

  guardarCambios(): void {
    if (!this.pedidoSeleccionado) return;

    const id = this.pedidoSeleccionado.id_pedido;
    const nuevoEstado = this.pedidoSeleccionado.estado;

    this.pedidoService.updatePedidoStatus(id, nuevoEstado).subscribe({
      next: () => {
        alert('Estado actualizado con éxito.');
        this.cancelar();
        this.loadPedidos(); // Recargamos la lista
      },
      error: (err) => alert('Error al guardar los cambios.')
    });
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          alert('Pedido eliminado con éxito.');
          this.loadPedidos();
        },
        error: (err) => alert('Error al eliminar el pedido.')
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