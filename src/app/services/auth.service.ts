import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "api/auth/";

  constructor(private http: HttpClient){}

  public getUser(): string { return localStorage.getItem("idhealth_user"); }
  public setUser(userStorage: string){ localStorage.setItem("idhealth_user", userStorage); }

  public getToken(): string { return localStorage.getItem("idhealth_token"); }
  public setToken(tokenStorage: string){ localStorage.setItem("idhealth_token", tokenStorage); }

  public login(credentials: Credentials){
    return this.http.post<{usuario: any, token: string}>
      (environment.backendURL + this.api + "login", credentials);
  }

  public logout(){
    localStorage.removeItem("idhealth_user");
    localStorage.removeItem("idhealth_token");
  }
}