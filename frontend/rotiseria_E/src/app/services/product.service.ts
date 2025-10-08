import { Injectable } from '@angular/core';

export interface Product {
  id: string; name: string; price: number; desc: string; stock: number; img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: '08', name: 'Ñoquis de Papa', price: 9000, desc: 'Ñoquis caseros de papa con salsa a elección.', stock: 10, img: 'assets/menu/pastas/ñoquis.png' },
    { id: '20', name: 'Ravioles', price: 9500, desc: 'Ravioles rellenos de carne o verdura.', stock: 12, img: 'assets/menu/pastas/ravioles.png' },
    { id: '01', name: 'Hamburguesa', price: 9000, desc: 'Hamburguesa completa con carne, queso, lechuga y tomate.', stock: 15, img: 'assets/menu/entre_panes/hamburguesa.png' },
    { id: '07', name: 'Lomo', price: 19000, desc: 'Lomo completo con jamón, queso, lechuga, tomate y huevo.', stock: 8, img: 'assets/menu/entre_panes/lomo.png' },
    { id: '18', name: 'Lomopizza', price: 19000, desc: 'El clásico lomo acompañado de una base de pizza.', stock: 7, img: 'assets/menu/entre_panes/lomopizza.png' },
    { id: '19', name: 'Choripán', price: 7000, desc: 'Clásico choripán con chimichurri y pan casero.', stock: 20, img: 'assets/menu/entre_panes/chori.png' },
    { id: '11', name: 'Pancho', price: 2500, desc: 'Pancho clásico con salsas a elección.', stock: 25, img: 'assets/menu/entre_panes/pancho.png' },
    { id: '03', name: 'Milanesa Napolitana', price: 10000, desc: 'Milanesa de carne con salsa de tomate, jamón y queso gratinado.', stock: 9, img: 'assets/menu/caserito/milanapo.png' },
    { id: '10', name: 'Pollo al horno', price: 20000, desc: 'Pollo al horno con salsa a elección.', stock: 10, img: 'assets/menu/caserito/logo.png' },
    { id: '09', name: 'Papas Fritas', price: 5500, desc: 'Papas fritas crocantes, acompañadas con salsas.', stock: 30, img: 'assets/menu/caserito/papas.png' },
    { id: '06', name: 'Pizza Muzza', price: 11000, desc: 'Pizza clásica de muzzarella con salsa de tomate y aceitunas.', stock: 12, img: 'assets/menu/pizzas/pizza.jpg' },
    { id: '02', name: 'Pizza con Ananá', price: 12000, desc: 'Pizza especial con trozos de ananá, salsa de tomate y muzzarella.', stock: 10, img: 'assets/menu/pizzas/pizzaanana.png' },
    { id: '05', name: 'Empanadas de Pollo', price: 750, desc: 'Empanadas caseras rellenas de pollo.', stock: 40, img: 'assets/menu/empanadas/logo.png' },
    { id: '04', name: 'Empanadas de Carne', price: 800, desc: 'Empanadas caseras rellenas de carne.', stock: 40, img: 'assets/menu/empanadas/decarne.png' },
    { id: '12', name: 'Lata Gaseosa', price: 1500, desc: 'Gaseosa en lata, diferentes sabores disponibles.', stock: 30, img: 'assets/menu/bebidas/latagaseosa.png' },
    { id: '13', name: 'Gaseosa 1.5L', price: 2800, desc: 'Botella de gaseosa 1.5L, sabores variados.', stock: 25, img: 'assets/menu/bebidas/gaseosa.png' },
  ];

  getProducts() {
    return this.products;
  }
}