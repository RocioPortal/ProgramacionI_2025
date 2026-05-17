import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {      //¿tiene el ROL adecuado para ver esta pantalla específica?"
  return (route, state) => {                                               // allowRoles da una lista con los roles permitidos
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    const userRole = authService.getRole();          //obtiene rol del usuario actual y compara con la lista de roles permitidos

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    } else {
      alert('No tienes permiso para acceder a esta sección.');

      if (userRole === 'ADMIN') {
        router.navigate(['/administrador/menu']);             //redirigue segun toque
      } else if (userRole === 'EMPLEADO') {
        router.navigate(['/empleado/menu']);
      } else { 
        router.navigate(['/cliente/menu']);
      }
      
      return false;
    }
  };
};