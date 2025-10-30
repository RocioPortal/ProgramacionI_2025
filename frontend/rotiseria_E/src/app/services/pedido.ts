import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { PaginatedPedidos, Pedido, CrearPedidoRequest } from '../interfaces/pedido.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://127.0.0.1:5000'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPedidos(page: number, perPage: number): Observable<PaginatedPedidos> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<PaginatedPedidos>(`${this.apiUrl}/pedidos`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/pedido/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  createPedido(pedidoData: CrearPedidoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos`, pedidoData, {
      headers: this.getAuthHeaders()
    });
  }

  updatePedidoStatus(id: number, estado: string): Observable<any> {
    const body = { estado: estado };
    return this.http.put(`${this.apiUrl}/pedido/${id}`, body, {
      headers: this.getAuthHeaders()
    });
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pedido/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  getOrdenesByPedidoId(id_pedido: number): Observable<any> {
    let params = new HttpParams()
      .set('id_pedido', id_pedido.toString());
    
    return this.http.get<any>(`${this.apiUrl}/ordenes`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
}

