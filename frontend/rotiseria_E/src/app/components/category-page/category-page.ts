import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart'; 
import { Product as RealProduct } from '../../interfaces/product.interfaces'; 

interface Product {
  id_prod: number; 
  name: string;
  description: string;
  price: number; 
  image: string;
}

interface CategoryData {
  title: string;
  products: Product[];
}

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.css']
})
export class CategoryPage implements OnInit {
  
  categoryTitle: string = '';
  products: Product[] = [];

  private allData: { [key: string]: CategoryData } = {
    pizzas: {
      title: 'Pizzas',
      products: [
        { id_prod: 101, name: 'Pizza Muzzarella', description: 'Clásica pizza con muzzarella fresca y orégano.', price: 11000, image: 'assets/menu/pizzas/pizza.jpg' },
        { id_prod: 102, name: 'Pizza con Ananá', description: 'Combinación dulce y salada con trozos de ananá.', price: 12000, image: 'assets/menu/pizzas/pizzaanana.png' }
      ]
    },
    pastas: {
      title: 'Pastas',
      products: [
        { id_prod: 8, name: 'Ñoquis de Papa', description: 'Suaves ñoquis caseros con salsa a elección.', price: 9000, image: 'assets/menu/pastas/ñoquis.png' },
        { id_prod: 20, name: 'Ravioles', description: 'Ravioles rellenos de carne o verdura.', price: 9500, image: 'assets/menu/pastas/ravioles.png' }
      ]
    },

    'entre_panes': {
      title: 'Entre Panes',
      products: [
        { id_prod: 1, name: 'Hamburguesa', description: 'Completa con carne, queso, lechuga y tomate.', price: 9000, image: 'assets/menu/entre_panes/hamburguesa.png' },
        { id_prod: 7, name: 'Lomo', description: 'Completo con jamón, queso, lechuga, tomate y huevo.', price: 19000, image: 'assets/menu/entre_panes/lomo.png' },
        { id_prod: 18, name: 'Lomopizza', description: 'Clásico lomo con base de pizza.', price: 19000, image: 'assets/menu/entre_panes/lomopizza.png' }
      ]
    },
    empanadas: {
      title: 'Empanadas',
      products: [
        { id_prod: 4, name: 'Empanadas de Carne', description: 'Rellenas de carne cortada a cuchillo.', price: 800, image: 'assets/menu/empanadas/decarne.png' },
        { id_prod: 5, name: 'Empanadas de Pollo', description: 'Pollo sazonado y horneado.', price: 750, image: 'assets/menu/empanadas/logo.png' }
      ]
    },
    bebidas: {
      title: 'Bebidas',
      products: [
        { id_prod: 12, name: 'Lata de Gaseosa', description: 'Línea Coca, 310 ml.', price: 1500, image: 'assets/menu/bebidas/latagaseosa.png' },
        { id_prod: 13, name: 'Gaseosa', description: 'Línea Coca 1,5 lt.', price: 2800, image: 'assets/menu/bebidas/gaseosa.png' },
        { id_prod: 11, name: 'Agua saborizada', description: '500ml de pomelo, naranja, manzana .', price: 2200, image: 'assets/menu/bebidas/aguasaborizada.png' },
        { id_prod: 15, name: 'Agua sin gas ', description: '500 ml.', price: 1000, image: 'assets/menu/bebidas/limon.png' }, 
        { id_prod: 16, name: 'Agua con gas ', description: '500 ml.', price: 1000, image: 'assets/menu/bebidas/limon.png' },
      ]
    },
    caserito: {
      title: 'Caserito',
      products: [
        {id_prod: 10 , name: 'Pollo al horno', description: 'pollo entero cocido al horno', price: 20000, image: 'assets/menu/caserito/logo.png'},
        {id_prod: 9 , name: 'Papas fritas', description: 'grandes, cortadas y fritas', price: 5500, image: 'assets/menu/caserito/papas.png'},
        {id_prod: 14 , name: 'Milanesa', description: 'Napolitana.', price: 10000, image: 'assets/menu/caserito/milanapo.png'},

      ]
    }
  };

  // 5. INYECTAMOS EL CART SERVICE
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.allData[id]) {
      this.categoryTitle = this.allData[id].title;
      this.products = this.allData[id].products;
    } else {
      this.categoryTitle = 'Categoría no encontrada';
      this.products = [];
    }
  }

  // 6. CREAMOS LA FUNCIÓN 'addToCart'
  addToCart(product: Product) {
    const productToAdd: RealProduct = {
      id_prod: product.id_prod,
      nombre: product.name,
      descripcion: product.description,
      precio: product.price,
      disponible: true 
    };

    this.cartService.addProduct(productToAdd);
    alert(`${product.name} añadido al carrito!`);
  }
}