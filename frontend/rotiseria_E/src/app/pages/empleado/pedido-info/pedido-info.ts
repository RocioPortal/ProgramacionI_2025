import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido';
import { Pedido, OrdenItem } from '../../../interfaces/pedido.interfaces';
import { getProductImage } from '../../../utils/image-helper';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-pedido-info',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './pedido-info.html',
  styleUrl: './pedido-info.css'
})
export class PedidoInfo implements OnInit {

  pedido: Pedido | null = null;
  ordenes: OrdenItem[] = []; 
  totalPedido: number = 0;  
  
  selectedStatus: string = '';
  public getProductImage = getProductImage;

  posiblesEstados = [
    'pendiente', 'en preparación', 'listo para retiro', 'entregado', 'cancelado'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPedidoData(+id);
    }
  }

  loadPedidoData(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe({
      next: (pedido: any) => {
        this.pedido = pedido;
        this.ordenes = pedido.ordenes || [];
        this.selectedStatus = pedido.estado;
        this.totalPedido = this.ordenes.reduce((sum, item) => sum + item.precio_total, 0);
      },
      error: (err) => {
        console.error('Error al cargar datos del pedido', err);
        alert('No se pudo encontrar el pedido.');
        this.router.navigate(['/empleado/pedidos']);
      }
    });
  }

  guardarEstado(): void {
    if (!this.pedido) return;
    
    const payload = {
      estado: this.selectedStatus,
      ordenes: this.ordenes 
    };

    this.pedidoService.updatePedido(this.pedido.id_pedido, payload).subscribe({
      next: () => {
        alert('Pedido actualizado con éxito (Estado y Notas guardadas).');
        this.router.navigate(['/empleado/pedidos']);
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }
}