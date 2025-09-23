import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    Navbar,
    RouterLink

  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

}