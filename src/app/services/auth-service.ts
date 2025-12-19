import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = signal<boolean>(
    localStorage.getItem('isLogged') === 'true'
  );

  login() {
    this.isLogged.set(true);
    localStorage.setItem('isLogged', 'true');
  }

  isLoggedIn(){
    return this.isLogged;
  }
}
