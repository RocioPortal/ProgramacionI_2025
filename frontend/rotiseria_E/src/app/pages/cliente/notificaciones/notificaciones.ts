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

  get pedidosConfirmados() {
    return this.pedidos.filter(p =>
      p.estado === 'entregado' || p.estado === 'listo para retiro'
    );
  }
  get pedidosPendientes() {
    return this.pedidos.filter(p =>
      p.estado === 'pendiente' || p.estado === 'en preparación'
    );
  }
  get pedidosCancelados() {
    return this.pedidos.filter(p => p.estado === 'cancelado');
  }

  getIconoEstado(estado: string): string {
    if (estado === 'entregado') return 'bi-check-circle-fill';
    if (estado === 'listo para retiro') return 'bi-bag-check-fill';
    if (estado === 'en preparación') return 'bi-fire';
    if (estado === 'pendiente') return 'bi-hourglass-split';
    return 'bi-x-circle-fill';
  }

  getClaseEstado(estado: string): string {
    if (estado === 'entregado') return 'bg-success-subtle text-success';
    if (estado === 'listo para retiro') return 'bg-info-subtle text-info';
    if (estado === 'en preparación') return 'bg-warning-subtle text-warning';
    if (estado === 'pendiente') return 'bg-secondary-subtle text-secondary';
    return 'bg-danger-subtle text-danger';
  }

  getBadgeEstado(estado: string): string {
    if (estado === 'entregado') return 'bg-success';
    if (estado === 'listo para retiro') return 'bg-info';
    if (estado === 'en preparación') return 'bg-warning text-dark';
    if (estado === 'pendiente') return 'bg-secondary';
    return 'bg-danger';
  }

  getTituloEstado(estado: string): string {
    if (estado === 'entregado') return 'Pedido entregado ✓';
    if (estado === 'listo para retiro') return 'Listo para retirar 🛍️';
    if (estado === 'en preparación') return 'En preparación 🔥';
    if (estado === 'pendiente') return 'Pedido pendiente';
    return 'Pedido cancelado';
  }

  getMensajeEstado(estado: string): string {
    if (estado === 'entregado') return 'Tu pedido fue entregado. ¡Gracias!';
    if (estado === 'listo para retiro') return 'Tu pedido está listo. Podés pasar a retirarlo.';
    if (estado === 'en preparación') return 'Estamos preparando tu pedido.';
    if (estado === 'pendiente') return 'Tu pedido está siendo procesado.';
    return 'Tu pedido fue cancelado.';
  }
}