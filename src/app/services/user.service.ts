import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "api/usuarios/";

  constructor(private http: HttpClient){}

  public getUsers(){

    let params = new HttpParams();

    params = params.append('desde', 0);
    params = params.append('limite', 0);
    
    return this.http.get<{total: number, usuarios:Usuario[]}>
      (environment.backendURL + this.api, { params: params });
  }
}