import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.css'
})
export class Todos {

}