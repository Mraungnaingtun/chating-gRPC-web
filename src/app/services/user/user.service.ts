import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../envoriments/environment';
import { Observable } from 'rxjs';
import { User } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Create a new user
  createUser(name: string, email: string, password: string): Observable<User> {
    const body = { name, email, password };
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, body);
  }

  // Get a user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}`);
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users`);
  }
  
}
