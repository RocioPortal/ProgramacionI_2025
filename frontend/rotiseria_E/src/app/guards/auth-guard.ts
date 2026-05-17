import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {      //"¿Esta persona inició sesión o es un visitante anónimo?"
  const authService = inject(AuthService);   //authservice es el servicio que maneja el login
  const router = inject(Router);

  if (authService.isLoggedIn()) {        //verifica que este loguineado
    return true;
  } else {
    router.navigate(['/login']);           //patea directametne a la pantalla login si NO esta loguineado
    return false;
  }
};