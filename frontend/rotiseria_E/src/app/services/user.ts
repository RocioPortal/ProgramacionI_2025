// Ruta: src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { User, PaginatedUsers } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getUsers(page: number, perPage: number, filters: any = {}): Observable<PaginatedUsers> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    for (const key in filters) {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    }

    return this.http.get<PaginatedUsers>(`${this.apiUrl}/usuarios`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usuario/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios`, userData, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: number, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}`, userData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}