import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { LoginRequest } from '../../../interfaces/login-request'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        if (res.role === 'ADMIN') {
          this.router.navigate(['/administrador/menu']);
        } else if (res.role === 'EMPLEADO') {
          this.router.navigate(['/empleado/menu']);
        } else {
          this.router.navigate(['/cliente/menu']);
        }
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMsg = 'Tu cuenta está pendiente de aprobación. Contactá con el local para activarla.';
        } else {
          this.errorMsg = 'Email o contraseña incorrectos.';
        }
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}