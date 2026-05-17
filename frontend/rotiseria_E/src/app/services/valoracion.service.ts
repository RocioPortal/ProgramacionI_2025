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

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  crearValoracion(data: Valoracion): Observable<any> {
    return this.http.post(`${this.apiUrl}/valoraciones`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getValoracionesByUser(id_user: number): Observable<any> {
    let params = new HttpParams().set('id_user', id_user.toString());
    return this.http.get(`${this.apiUrl}/valoraciones`, {
      headers: this.getAuthHeaders(),
      params
    });
  }
}