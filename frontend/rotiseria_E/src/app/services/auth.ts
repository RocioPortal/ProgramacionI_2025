import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  message: string;
  token: string;
  role: string;
  user: {
    email: string;
    id_user: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5001/auth/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };

    return this.http.post<AuthResponse>(this.apiUrl, body).pipe(
      tap(response => {
        this.saveSession(response.token, response.role);
      })
    );
  }

  private saveSession(token: string, role: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  }
  register(userData: any): Observable<any> {
    const registerUrl = 'http://127.0.0.1:5001/auth/register';
    return this.http.post(registerUrl, userData);
  }
}