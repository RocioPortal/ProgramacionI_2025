import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css'] 
})
export class EditarUsuarioComponent {
  @Input() usuario: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();

  guardar() {
    this.onSave.emit(this.usuario);
  }
}
