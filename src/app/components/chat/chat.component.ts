import { Component, inject } from '@angular/core';
import { AuthService, User } from '../../services/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, MatListModule, AsyncPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  private authService = inject(AuthService);
  private userservice = inject(UserService);
  private router = inject(Router);

  users!: Observable<User[]>;

  currentUser$ = this.authService.currentUser$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userservice.getAllUsers();
  }
}
