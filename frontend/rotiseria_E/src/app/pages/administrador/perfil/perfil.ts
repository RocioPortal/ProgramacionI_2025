import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver'; 
import { PerfilLogoutComponent } from '../componentes/perfil-logout/perfil-logout';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, BotonVolverComponent, PerfilLogoutComponent], 
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil { }