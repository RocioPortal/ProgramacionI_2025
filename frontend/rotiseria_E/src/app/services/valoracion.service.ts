import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface Valoracion {
  id_valoracion?: number;
  id_user: number;
  id_prod: number;
  calificacion: number;
  comentario: string;
  usuario?: string;
  producto?: string;
}

@Injectable({        //Instanciá a este cadete una sola vez cuando se abra la página web, y dejalo disponible para que cualquier pantalla (componente) lo pueda llamar en cualquier momento".
  providedIn: 'root'
})
export class ValoracionService {
  private apiUrl = 'http://127.0.0.1:5000'; //es tu computadora local (localhost) y el 5000 es el puerto de Flask que configuraste en tu archivo .env
                                            //sabe hacia dónde tiene que manejar la moto para buscar las reseñas de la rotisería.
  constructor(
    private http: HttpClient,   //motor de internet de Angular. Es el que sabe cómo hacer peticiones
    private authService: AuthService  //Llama al servicio hermano de seguridad para pedirle el token del usuario.
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` }); //Antes de viajar hacia Flask, el servicio agarra el token guardado en el navegador, arma una credencial oficial
                                                                    //y le manda a Flask para que sepa que es el usuario que está loguineado.
  }

  crearValoracion(data: Valoracion): Observable<any> {   //junta las estrellitas y el comentario que dejó el usuario y se los da a este método en formato data
    return this.http.post(`${this.apiUrl}/valoraciones`, data, {  //empaquetarlo y enviarlo a la URL exacta de Flask
      headers: this.getAuthHeaders()
    });
  }

  getValoracionesByUser(id_user: number): Observable<any> {   //"¡Valoración guardada!", la pantalla se actualiza y le muestra el mensaje
    let params = new HttpParams().set('id_user', id_user.toString());
    return this.http.get(`${this.apiUrl}/valoraciones`, {
      headers: this.getAuthHeaders(),
      params
    });
  }
}