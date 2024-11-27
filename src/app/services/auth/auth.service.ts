import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { environment } from '../../../envoriments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Login
  login(credentials: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/users/login`, credentials)
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Register
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/register', user);
  }

  // Helper methods
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}