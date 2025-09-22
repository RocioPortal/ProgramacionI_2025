import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMsg = ''; // <- necesario para el *ngIf en el HTML

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMsg = '';

    const role = this.inferRole(this.email, this.password);
    if (role) {
      this.router.navigate([`/${role}/menu`]);
    } else {
      this.errorMsg = 'Credenciales inválidas. Usá admin/admin, empleado/empleado o cliente/cliente.';
    }
  }

  private inferRole(
    email: string,
    password: string
  ): 'administrador' | 'empleado' | 'cliente' | null {
    const e = (email || '').toLowerCase().trim();
    const p = (password || '').toLowerCase().trim();

    if (e === 'admin' && p === 'admin') return 'administrador';
    if (e === 'empleado' && p === 'empleado') return 'empleado';
    if (e === 'cliente' && p === 'cliente') return 'cliente';
    return null;
  }
}