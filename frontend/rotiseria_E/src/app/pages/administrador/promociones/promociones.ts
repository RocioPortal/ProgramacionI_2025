import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- FUNDAMENTAL para el form
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';
import { BotonCrearpromoComponent } from '../componentes/boton-crearpromo/boton-crearpromo';
import { ProductService } from '../../../services/product.service'; // <-- FUNDAMENTAL para guardar

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, 
    BotonVolverComponent, BotonCrearpromoComponent
  ],
  templateUrl: './promociones.html',
  styleUrls: ['./promociones.css'] 
})
export class Promociones implements OnInit {
  mostrarLista: boolean = true;
  
  // Variables reales conectadas a tu DB
  productos: any[] = [];
  productoSeleccionadoId: number | null = null;
  porcentajeDescuento: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productService.getProducts(1, 100).subscribe({
      next: (data: any) => {
        this.productos = data.productos || data;
      }
    });
  }

  showForm() { this.mostrarLista = false; }
  showList() { this.mostrarLista = true; }

  // La magia ocurre acá:
  guardarPromocion() {
    if (!this.productoSeleccionadoId || this.porcentajeDescuento <= 0) {
      alert('⚠️ Por favor, seleccioná un producto y un porcentaje válido.');
      return;
    }

    const productoActual = this.productos.find(p => p.id_prod == this.productoSeleccionadoId || p.id_producto == this.productoSeleccionadoId);
    
    if (productoActual) {
      // Le mandamos un PUT con su nuevo descuento
      const idParaActualizar = productoActual.id_prod || productoActual.id_producto;
      const productoActualizado = { ...productoActual, descuento: this.porcentajeDescuento };

      this.productService.updateProduct(idParaActualizar, productoActualizado).subscribe({
        next: () => {
          alert('✅ ¡Promoción aplicada al producto con éxito!');
          this.mostrarLista = true;
          this.cargarProductos(); // Recargamos la lista
          this.productoSeleccionadoId = null;
          this.porcentajeDescuento = 0;
        },
        error: (err) => console.error('Error al guardar promo:', err)
      });
    }
  }

  // --- NUEVA FUNCIÓN PARA MANDAR MAILS REUTILIZANDO EL SERVICIO ---
  enviarNotificacion(promo: any) {
    if (confirm(`¿Querés enviar esta promoción de ${promo.nombre} por mail a todos los clientes?`)) {
      
      const idParaActualizar = promo.id_prod || promo.id_producto;
      
      // Armamos el paquete de datos y le inyectamos la bandera que activará el mail en Flask
      const datosActualizados = {
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        precio: promo.precio,
        disponible: promo.disponible,
        descuento: promo.descuento,
        notificar: true // <-- ¡Esta es la llave maestra!
      };

      this.productService.updateProduct(idParaActualizar, datosActualizados).subscribe({
        next: () => {
          alert('✅ ¡Mails enviados con éxito a todos los clientes!');
        },
        error: (err) => {
          console.error('Error al enviar correos:', err);
          alert('❌ Hubo un error al intentar enviar los correos.');
        }
      });
    }
  }
}