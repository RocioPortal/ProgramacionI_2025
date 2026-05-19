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



//auth-guard es patovica de pta principal, Solo se fija si tenés un token JWT guardado en tu navegador
//role-guard es patovica del vip, Mira tu token y lo abre para leer el campo rol. Si la pantalla dice que solo entran ['ADMIN'] y vos tenés rol de USER, te rebota.