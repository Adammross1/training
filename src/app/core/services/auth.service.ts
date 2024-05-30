import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = false;

  public getIsAuthenticated = () => {
    return this.auth;
  }

  public login = () => {
    this.auth = true;
  }

  public logout = () => {
    this.auth = false;
  }
}
