import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../components/navbar/navbar';
import { PedidoService } from '../../../services/pedido';
import { Pedido, OrdenItem } from '../../../interfaces/pedido.interfaces';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, Navbar, RouterLink],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones implements OnInit {
  pedidos: Pedido[] = [];
  cargando = true;
  error = '';
  pedidoExpandido: number | null = null;
  ordenesPorPedido: { [id: number]: OrdenItem[] } = {};
  cargandoOrdenes: { [id: number]: boolean } = {};

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.pedidoService.getPedidosByUsuario(1, 50).subscribe({
      next: (res) => {
        this.pedidos = res.pedidos.sort((a, b) => b.id_pedido - a.id_pedido);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pedidos.';
        this.cargando = false;
      }
    });
  }

  togglePedido(id_pedido: number): void {
    if (this.pedidoExpandido === id_pedido) {
      this.pedidoExpandido = null;
      return;
    }
    this.pedidoExpandido = id_pedido;
    if (!this.ordenesPorPedido[id_pedido]) {
      this.cargandoOrdenes[id_pedido] = true;
      this.pedidoService.getOrdenesByPedidoId(id_pedido).subscribe({
        next: (res) => {
          this.ordenesPorPedido[id_pedido] = res.ordenes || [];
          this.cargandoOrdenes[id_pedido] = false;
        },
        error: () => {
          this.ordenesPorPedido[id_pedido] = [];
          this.cargandoOrdenes[id_pedido] = false;
        }
      });
    }
  }

  get pedidosConfirmados() { return this.pedidos.filter(p => p.estado === 'confirmado'); }
  get pedidosPendientes() { return this.pedidos.filter(p => p.estado === 'pendiente'); }
  get pedidosCancelados() { return this.pedidos.filter(p => p.estado === 'cancelado'); }

  getIconoEstado(estado: string): string {
    if (estado === 'confirmado') return 'bi-check-circle-fill';
    if (estado === 'pendiente') return 'bi-hourglass-split';
    return 'bi-x-circle-fill';
  }

  getClaseEstado(estado: string): string {
    if (estado === 'confirmado') return 'bg-success-subtle text-success';
    if (estado === 'pendiente') return 'bg-warning-subtle text-warning';
    return 'bg-danger-subtle text-danger';
  }

  getBadgeEstado(estado: string): string {
    if (estado === 'confirmado') return 'bg-success';
    if (estado === 'pendiente') return 'bg-warning text-dark';
    return 'bg-danger';
  }

  getTituloEstado(estado: string): string {
    if (estado === 'confirmado') return 'Pedido confirmado ✓';
    if (estado === 'pendiente') return 'Pedido pendiente';
    return 'Pedido cancelado';
  }

  getMensajeEstado(estado: string): string {
    if (estado === 'confirmado') return 'Tu pedido fue confirmado y está listo.';
    if (estado === 'pendiente') return 'Estamos procesando tu pedido.';
    return 'Tu pedido fue cancelado.';
  }
}