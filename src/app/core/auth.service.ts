import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  id: number;
  username: string;
  role: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/auth`;

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((user) => {
        if (user?.token) localStorage.setItem('token', user.token);
        localStorage.setItem('usuario', JSON.stringify(user));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getUsuario(): LoginResponse | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getUsuario();
  }

  getRole(): string | null {
    const user = this.getUsuario();
    return user ? user.role : null;
  }

  getUserId(): number | null {
    const user = this.getUsuario();
    return user ? user.id : null;
  }
}
