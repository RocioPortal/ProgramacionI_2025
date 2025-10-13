import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../components/navbar/navbar';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-menu-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {

  categories: Category[] = [
    {
      id: 'pastas',
      name: 'Pastas',
      imageUrl: 'assets/menu/pastas/ñoquis.png'
    },
    {
      id: 'entre-panes',
      name: 'Entre Panes',
      imageUrl: 'assets/menu/entre_panes/logo.png'
    },
    {
      id: 'pizzas',
      name: 'Pizzas',
      imageUrl: 'assets/menu/pizzas/logo.png'
    },
    {
      id: 'caserito',
      name: 'Caserito',
      imageUrl: 'assets/menu/caserito/logo.png'
    },
    {
      id: 'empanadas',
      name: 'Empanadas',
      imageUrl: 'assets/menu/empanadas/logo.png'
    },
    {
      id: 'bebidas',
      name: 'Bebidas',
      imageUrl: 'assets/menu/bebidas/logo.png'
    }
  ];

  constructor() { }
}