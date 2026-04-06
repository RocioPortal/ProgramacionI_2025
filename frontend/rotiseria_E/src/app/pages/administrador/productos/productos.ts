import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service'; 
import { Product } from '../../../interfaces/product.interfaces'; 
import { ProductListComponent } from '../../../components/product-list/product-list';
import { getProductImage } from '../../../utils/image-helper';

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
    ReactiveFormsModule,
    RouterLink,
    ProductListComponent,
    BotonVolverComponent,
    BotonNuevoproductoComponent
  ],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class Productos implements OnInit { 
  // --- Estado de la Vista ---
  public getProductImage = getProductImage; 
  mostrarLista: boolean = true;
  mostrarDetalle: boolean = false;
  mostrarFormulario: boolean = false;

  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalProducts: number = 0;
  perPage: number = 6; 
  // --- Formularios ---
  productoSeleccionado: Product | null = null;
  productForm: FormGroup; 
  filterForm: FormGroup; 

  constructor(
    private productService: ProductService,
    private fb: FormBuilder 
  ) {
    this.filterForm = this.fb.group({
      nombre: [''],     
      precio_max: [null] 
    });

    this.productForm = this.fb.group({
      id_prod: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      disponible: [true]
    });
  }

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    const filters = this.filterForm.value; 
    this.productService.getProducts(this.currentPage, this.perPage, filters)
      .subscribe(response => {
        this.products = response.productos;
        this.totalPages = response.pages;
        this.totalProducts = response.total;
      });
  }

  verDetalle(producto: Product) {
    this.productoSeleccionado = producto;
    this.productForm.patchValue({
        id_prod: producto.id_prod,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        disponible: producto.disponible
    });
    this.mostrarLista = false;
    this.mostrarDetalle = true;
    this.mostrarFormulario = false;
  }

  verFormularioNuevo() {
    this.productForm.reset({ disponible: true }); 
    this.productoSeleccionado = null;
    this.mostrarLista = false;
    this.mostrarDetalle = false;
    this.mostrarFormulario = true;
  }

  verLista() {
    this.mostrarLista = true;
    this.mostrarDetalle = false;
    this.mostrarFormulario = false;
  }

  onFilterSubmit(): void {
    this.currentPage = 1; 
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }


  submitProductForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); 
      return;
    }

    const productData = this.productForm.value;

    if (productData.id_prod) {
      this.productService.updateProduct(productData.id_prod, productData).subscribe({
        next: () => {
          alert('Producto actualizado con éxito');
          this.verLista();
          this.loadProducts(); 
        },
        error: (err) => alert(`Error al actualizar: ${err.message}`)
      });
    } else {
      const { id_prod, ...newProductData } = productData;
      this.productService.createProduct(newProductData).subscribe({
        next: () => {
          alert('Producto creado con éxito');
          this.verLista();
          this.loadProducts(); 
        },
        error: (err) => alert(`Error al crear: ${err.message}`)
      });
    }
  }

  eliminarProductoConfirmado(): void {
    if (!this.productoSeleccionado?.id_prod) return;

    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(this.productoSeleccionado.id_prod).subscribe({
        next: () => {
          alert('Producto eliminado con éxito');
          this.verLista();
          this.loadProducts(); 
        },
        error: (err) => alert(`Error al eliminar: ${err.message}`)
      });
    }
  }
}