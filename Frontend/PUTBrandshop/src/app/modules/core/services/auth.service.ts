import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  IUser,
  LoggedInResponse,
  LoginData,
  RecoveryPasswordData,
  RegisterData,
  ResetPasswordData,
} from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, body, {
      withCredentials: true,
    });
  }

  logout(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/logout`, {
      withCredentials: true,
    });
  }

  autoLogin(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/auto-login`, {
      withCredentials: true,
    });
  }

  isLoggedIn(): Observable<LoggedInResponse> {
    return this.http.get<LoggedInResponse>(`${this.apiUrl}/logged-in`, {
      withCredentials: true,
    });
  }

  register(body: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, body);
  }

  activateAccount(uid: string): Observable<AuthResponse> {
    const params = new HttpParams().append('uid', uid);
    return this.http.get<AuthResponse>(`${this.apiUrl}/activate`, { params });
  }

  resetPassword(body: RecoveryPasswordData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/reset-password`, body);
  }

  changePassword(body: ResetPasswordData): Observable<AuthResponse> {
    return this.http.patch<AuthResponse>(`${this.apiUrl}/reset-password`, body);
  }
}
