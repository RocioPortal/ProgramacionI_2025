import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Cambio: Importa RouterLink

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
    RouterLink, // Cambio: Usa RouterLink aquí
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
export class ProductosComponent {
  mostrarLista: boolean = true;
  mostrarDetalle: boolean = false;
  mostrarFormulario: boolean = false;

  productoSeleccionado: any = null;

  productos = [
    { id: 'noquis', name: 'Ñoquis de Papa', price: 9000, desc: 'Ñoquis caseros de papa con salsa a elección.', stock: 10, img: 'noquis.png' },
    { id: 'ravioles', name: 'Ravioles', price: 19000, desc: 'Ravioles rellenos de carne o verdura, acompañados con salsa a elección.', stock: 12, img: 'ravioles.png' },
    { id: 'hamburguesa', name: 'Hamburguesa', price: 9000, desc: 'Hamburguesa completa con carne, queso, lechuga y tomate.', stock: 15, img: 'hamburguesa.png' },
    { id: 'lomo', name: 'Lomo', price: 19000, desc: 'Lomo completo con jamón, queso, lechuga, tomate y huevo.', stock: 8, img: 'lomo.png' },
    { id: 'lomopizza', name: 'Lomopizza', price: 19000, desc: 'El clásico lomo acompañado de una base de pizza.', stock: 7, img: 'lomopizza.png' },
    { id: 'choripan', name: 'Choripán', price: 7000, desc: 'Clásico choripán con chimichurri y pan casero.', stock: 20, img: 'choripan.png' },
    { id: 'pancho', name: 'Pancho', price: 2500, desc: 'Pancho clásico con salsas a elección.', stock: 25, img: 'pancho.png' },
    { id: 'milanesa', name: 'Milanesa Napolitana', price: 10000, desc: 'Milanesa de carne con salsa de tomate, jamón y queso gratinado.', stock: 9, img: 'milanesa.png' },
    { id: 'pollo', name: 'Pollo al horno', price: 20000, desc: 'Pollo al horno con salsa a elección.', stock: 10, img: 'pollo.png' },
    { id: 'papas', name: 'Papas Fritas', price: 5500, desc: 'Papas fritas crocantes, acompañadas con salsas.', stock: 30, img: 'papas.png' },
    { id: 'muzza', name: 'Pizza Muzza', price: 11000, desc: 'Pizza clásica de muzzarella con salsa de tomate y aceitunas.', stock: 12, img: 'muzza.png' },
    { id: 'pizzaAnana', name: 'Pizza con Ananá', price: 12000, desc: 'Pizza especial con trozos de ananá, salsa de tomate y muzzarella.', stock: 10, img: 'pizzaAnana.png' },
    { id: 'empPollo', name: 'Empanadas de Pollo', price: 750, desc: 'Empanadas caseras rellenas de pollo.', stock: 40, img: 'empPollo.png' },
    { id: 'empCarne', name: 'Empanadas de Carne', price: 800, desc: 'Empanadas caseras rellenas de carne.', stock: 40, img: 'empanadas.png' },
    { id: 'lataGaseosa', name: 'Lata Gaseosa', price: 1500, desc: 'Gaseosa en lata, diferentes sabores disponibles.', stock: 30, img: 'gaseosaLata.png' },
    { id: 'Gaseosa', name: 'Gaseosa', price: 2800, desc: 'Botella de gaseosa 1.5L, sabores variados.', stock: 25, img: 'gaseosa.png' },
    { id: 'aguaConGas', name: 'Agua con gas', price: 2100, desc: 'Agua mineral con gas, botella de 500ml.', stock: 20, img: 'agua.png' },
    { id: 'aguaSinGas', name: 'Agua sin gas', price: 2000, desc: 'Agua mineral sin gas, botella de 500ml.', stock: 18, img: 'agua.png' },
    { id: 'aguaSaborizada', name: 'Agua saborizada', price: 2200, desc: 'Agua mineral saborizada, botella de 500ml.', stock: 15, img: 'aguaSaborizada.png' },
    { id: 'cerveza', name: 'Lata de cerveza', price: 3700, desc: 'Lata de cerveza 473ml, diferentes marcas.', stock: 22, img: 'cerveza.png' },
  ];

  verDetalle(producto: any) {
    this.productoSeleccionado = { ...producto }; // Crear una copia para la edición
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
    // Lógica para guardar la edición
    this.verLista();
  }

  eliminarProducto() {
    // Lógica para eliminar el producto
    this.verLista();
  }

  agregarProducto() {
    // Lógica para agregar el nuevo producto
    this.verLista();
  }
}