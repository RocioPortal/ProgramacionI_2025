import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';

import { BotonNuevoproductoComponent } from '../componentes/boton-nuevoproducto/boton-nuevoproducto';
import { VerProductoComponent } from '../componentes/ver-producto/ver-producto';
import { ConfirmarEdicionComponent } from '../componentes/confirmar-edicion/confirmar-edicion';
import { EliminarProductoComponent } from '../componentes/eliminar-producto/eliminar-producto';
import { AgregarProductoComponent } from '../componentes/agregar-producto/agregar-producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BotonVolverComponent,
    BotonNuevoproductoComponent,
    VerProductoComponent,
    ConfirmarEdicionComponent,
    EliminarProductoComponent,
    AgregarProductoComponent
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  mostrarLista: boolean = true;
  mostrarDetalle: boolean = false;
  mostrarFormulario: boolean = false;

  productoSeleccionado: any = null; 

  verDetalle(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.mostrarLista = false;
    this.mostrarDetalle = true;
  }

  verLista() {
    this.mostrarLista = true;
    this.mostrarDetalle = false;
    this.mostrarFormulario = false;
  }

  verFormulario() {
    this.mostrarLista = false;
    this.mostrarFormulario = true;
  }

  guardarEdicion() {
    this.verLista();
  }

  eliminarProducto() {
    this.verLista();
  }

  agregarProducto() {
    this.verLista();
  }
}