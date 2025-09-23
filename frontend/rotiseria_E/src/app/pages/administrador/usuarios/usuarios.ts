import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Usuario {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  type?: string;
}

import { BotonVolverComponent } from '../componentes/boton-volver/boton-volver';
import { EditarUsuarioComponent } from '../componentes/editar-usuario/editar-usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BotonVolverComponent,
    EditarUsuarioComponent
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  mostrarLista: boolean = true;
  filtroActual: string = 'cliente';
  terminoBusqueda: string = '';

  usuarios = [
    { name: "Juan Pérez", email: "juan@gmail.com", phone: "123456", role: "Cliente", status: "Activo", type: "cliente" },
    { name: "María López", email: "maria@gmail.com", phone: "987654", role: "Empleado", status: "Activo", type: "empleado" },
    { name: "Carlos Gómez", email: "carlos@gmail.com", phone: "456789", role: "Cliente", status: "Inactivo", type: "cliente" }
  ];

  usuariosFiltrados: any[] = [];
  usuarioSeleccionado: any = null;

  ngOnInit() {
    this.filtrarUsuarios();
  }

  cambiarTipo(tipo: string) {
    this.filtroActual = tipo;
    this.filtrarUsuarios();
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.type === this.filtroActual &&
      (usuario.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.terminoBusqueda.toLowerCase()))
    );
  }

  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.mostrarLista = false;
  }

  guardarCambios(usuarioModificado: any) {
    const index = this.usuarios.findIndex(u => u.email === usuarioModificado.email);
    if (index !== -1) {
      this.usuarios[index] = usuarioModificado;
    }
    this.volverALista();
  }

  volverALista() {
    this.mostrarLista = true;
    this.filtrarUsuarios();
  }
}