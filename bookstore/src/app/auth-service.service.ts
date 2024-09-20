import { Injectable } from '@angular/core';
import { User, UserService } from './user.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isAuthenticated = false;

  constructor(private userService: UserService) { }

  login(email: string, password: string): Observable<string> {
    return this.userService.logIn(email, password).pipe(
      map((response) => {
        localStorage.setItem('user', JSON.stringify({ email, token: response.token }));
        this.isAuthenticated = true;
        return response.message;
      }),
      catchError((err) => {
        return of(err.error.message);
      })
    );
  }

  signUp(user: User): Observable<string> {
    return this.userService.signUp(user).pipe(
      map((response) => {

        var email = user.email;
        localStorage.setItem('user', JSON.stringify({ email, token: response.token }));

        return response.message
      }),
      catchError((err) => {
        return of(err.error.message);
      })
    )
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Get user details
  getUserDetails() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Logout and clear localStorage
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }
}
