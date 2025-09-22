import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BotonVolverComponent } from '../boton-volver/boton-volver';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, BotonVolverComponent],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css'
})
export class EditarUsuarioComponent {
  @Input() usuario: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();

  guardar() {
    this.onSave.emit(this.usuario);
  }
}