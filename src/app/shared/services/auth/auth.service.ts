import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IAuthResponse } from '../../../interfaces/IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.BASE_URL;
  private logoutSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<{ message: string; data: string }>(
        `${this.apiUrl}/auth/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          const token = response.data;
          if (token) {
            localStorage.setItem('authToken', token);
          } else {
            console.error('No se recibió un token válido');
          }
        }),
        map((response) => response.data)
      );
  }

  public async getAuthData(): Promise<IAuthResponse> {
    return await lastValueFrom(this.http.get<IAuthResponse>(`${this.apiUrl}/auth/data`)); 
  }

  logout() {
    localStorage.removeItem('authToken');
    this.logoutSubject.next();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  get logoutObservable(): Observable<void> {
    return this.logoutSubject.asObservable();
  }
}
