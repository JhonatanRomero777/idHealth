import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { UsuarioCreate } from '../models/usuario.create';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "api/usuarios/";

  constructor(private http: HttpClient, private interceptorService: InterceptorService){}

  public index(){

    return this.http.get<{total: number, usuarios:Usuario[]}>
      (environment.backendURL + this.api, this.interceptorService.allListParameter());
  }

  public create(data: UsuarioCreate){

    console.log(data);
    return this.http.post<{usuario: Usuario}>
    (environment.backendURL + this.api, data);
  }

  public update(data: UsuarioCreate, userId: string){

    return this.http.put<Usuario>
    (environment.backendURL + this.api + userId, data, this.interceptorService.tokenHeader());
  }

  public delete(user: Usuario){

    return this.http.delete<Usuario>
    (environment.backendURL + this.api + user.uid, this.interceptorService.tokenHeader());
  }
}