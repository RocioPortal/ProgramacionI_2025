import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver'; 
import { EditarPedidoComponent } from '../componentes/editar-pedido/editar-pedido'; 
import { BorrarPedidoComponent } from '../componentes/borrar-pedido/borrar-pedido'; 
import { ConfirmarPedidoComponent } from '../componentes/confirmar-pedido/confirmar-pedido'; 
import { CancelarPedidoComponent } from '../componentes/cancelar-pedido/cancelar-pedido'; 

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    FormsModule,
    BotonVolverComponent,
    EditarPedidoComponent,
    BorrarPedidoComponent,
    ConfirmarPedidoComponent,
    CancelarPedidoComponent
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {
  mostrarLista: boolean = true;
  idPedidoSeleccionado: string = '';

  pedidos = [
    { id: '5430', estado: 'Confirmado', cliente: 'Lola Argenta', telefono: '26131931319', email: 'lolaargenta123@gmail.com' },
    { id: '1942', estado: 'Pendiente', cliente: 'Juan Gomez', telefono: '2614567890', email: 'juan.gomez@example.com' },
    { id: '7851', estado: 'Cancelado', cliente: 'Maria Fernández', telefono: '2611234567', email: 'maria.f@example.com' },
    { id: '4834', estado: 'Pendiente', cliente: 'Pedro Suárez', telefono: '2619876543', email: 'pedro.s@example.com' }
  ];
  
  pedidoSeleccionado: any = null;

  verDetalle(id: string) {
    this.pedidoSeleccionado = this.pedidos.find(p => p.id === id);
    this.mostrarLista = false;
  }

  volver() {
    this.mostrarLista = true;
  }

  confirmar() {
    alert("Pedido confirmado!");
    this.volver();
  }

  cancelar() {
    this.volver();
  }
}