import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  registerForm: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('Registro exitoso!', res);
        this.successMsg = '¡Te has registrado con éxito! Serás redirigido al login...';
        // Espera 2 segundos y redirige al login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error de registro:', err);
        // El backend puede enviar un mensaje de error específico
        this.errorMsg = err.error?.mensaje || 'Ocurrió un error durante el registro.';
      }
    });
  }
}