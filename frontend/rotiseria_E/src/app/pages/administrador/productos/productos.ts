import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ProductListComponent } from '../../../components/product-list/product-list';
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';
import { BotonNuevoproductoComponent } from '../componentes/boton-nuevoproducto/boton-nuevoproducto';
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
    ProductListComponent,
    BotonVolverComponent,
    BotonNuevoproductoComponent,
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
  products: Product[] = [];
  productoSeleccionado: any = null;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  verDetalle(producto: Product) {
    this.productoSeleccionado = { ...producto };
    this.mostrarLista = false;
    this.mostrarDetalle = true;
    this.mostrarFormulario = false;
  }

  verLista() {
    this.mostrarLista = true;
    this.mostrarDetalle = false;
    this.mostrarFormulario = false;
  }

  verFormulario() {
    this.mostrarLista = false;
    this.mostrarDetalle = false;
    this.mostrarFormulario = true;
  }

  guardarEdicion() {
    console.log('Guardando:', this.productoSeleccionado);
    this.verLista();
  }

  eliminarProducto() {
    console.log('Eliminando:', this.productoSeleccionado);
    this.verLista();
  }

  agregarProducto() {
    console.log('Agregando nuevo producto...');
    this.verLista();
  }
}