import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {      
  return (route, state) => {                                               
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {    
      router.navigate(['/login']);
      return false;
    }

    const userRole = authService.getRole();          

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    } else {
      alert('No tienes permiso para acceder a esta sección.');

      if (userRole === 'ADMIN') {
        router.navigate(['/administrador/menu']);             
      } else if (userRole === 'EMPLEADO') {
        router.navigate(['/empleado/menu']);
      } else { 
        router.navigate(['/cliente/menu']);
      }
      
      return false;
    }
  };
};