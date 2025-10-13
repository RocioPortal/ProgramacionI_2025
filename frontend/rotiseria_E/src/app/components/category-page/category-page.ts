import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  description: string;
  price: string;
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
        { name: 'Pizza Muzzarella', description: 'Clásica pizza con muzzarella fresca y orégano.', price: '$11.000', image: 'assets/menu/pizzas/pizza.jpg' },
        { name: 'Pizza con Ananá', description: 'Combinación dulce y salada con trozos de ananá.', price: '$12.000', image: 'assets/menu/pizzas/pizzaanana.png' }
      ]
    },
    pastas: {
      title: 'Pastas',
      products: [
        { name: 'Ñoquis de Papa', description: 'Suaves ñoquis caseros con salsa a elección.', price: '$9.000', image: 'assets/todos/ñoquis.jpg' },
        { name: 'Ravioles', description: 'Ravioles de verdura y ricota con tuco casero.', price: '$9.500', image: 'assets/todos/ravioles.png' }
      ]
    },
    'entre-panes': {
      title: 'Entre Panes',
      products: [
        { name: 'Hamburguesa', description: 'Hamburguesa completa con queso, lechuga y tomate.', price: '$9.000', image: 'assets/todos/hamburguesa.png' },
        { name: 'Lomo', description: 'Sándwich de lomo completo con jamón y huevo.', price: '$19.000', image: 'assets/todos/lomo.png' }
      ]
    },
    'caserito': {
      title: 'Caserito',
      products: [
        { name: 'Milanesa Napolitana', description: 'Milanesa de pollo o carne, frita o al horno, napolitana.', price: '$10.000', image: 'assets/menu/caserito/milanapo.png' },
        { name: 'Pollo al horno', description: 'Pollo entero trozado, al horno. Sin guarnición.', price: '$20.000', image: 'assets/menu/caserito/logo.png' },
        { name: 'Papas Fritas', description: 'Fritas, porción grande y cortadas gruesas.', price: '$5.500', image: 'assets/menu/caserito/papas.png' }
      ]
    },
    'empanadas': {
      title: 'Empanadas',
      products: [
        { name: 'Empanadas de carne', description: 'El clásico relleno criollo en masa dorada y artesanal.', price: '$800', image: 'assets/menu/empanadas/decarne.png' },
        { name: 'Empanadas de pollo', description: 'Pollo sazonado y horneado en masa crujiente.', price: '$750', image: 'assets/menu/empanadas/logo.png' }
      ]
    },
    'bebidas': {
      title: 'Bebidas',
      products: [
        { name: 'Lata de Gaseosa', description: 'Línea Coca, 310 ml.', price: '$1.500', image: 'assets/menu/bebidas/latagaseosa.png' },
        { name: 'Gaseosa', description: 'Línea Coca 1,5 lt.', price: '$2.800', image: 'assets/menu/bebidas/gaseosa.png' },
        { name: 'Agua con gas', description: '500 ml.', price: '$2.100', image: 'assets/menu/bebidas/aguacgas.png' },
        { name: 'Agua sin gas', description: '500 ml.', price: '$2.100', image: 'assets/menu/bebidas/aguasgas.png' },
        { name: 'Agua Saborizada', description: 'Pomelo, Naranja, Manzana, 500 ml.', price: '$2.200', image: 'assets/menu/bebidas/aguasaborizada.png' },
        { name: 'Lata de Cerveza', description: 'Andes, Quilmes, Stella, Corona, 473 ml.', price: '$3.700', image: 'assets/menu/bebidas/logo.png' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId && this.allData[categoryId]) {
      this.categoryTitle = this.allData[categoryId].title;
      this.products = this.allData[categoryId].products;
    } else {
      this.categoryTitle = 'Categoría no encontrada';
    }
  }
}