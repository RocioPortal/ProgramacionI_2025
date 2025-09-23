import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}