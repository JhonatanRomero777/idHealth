import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = "api/categorias/";

  constructor(private http: HttpClient, private authService: AuthService){}

  public index(){
    
    let params = new HttpParams();

    params = params.append('desde', 0);
    params = params.append('limite', 0);

    return this.http.get<{total: number, categorias: Categoria[]}>
      (environment.backendURL + this.api, { params: params });
  }

  public create($name: string){

    let headers = new HttpHeaders();

    headers = headers.append('x-token', this.authService.getToken());

    let data = {
      nombre: $name
    };

    return this.http.post<Categoria>
    (environment.backendURL + this.api, data, {'headers':headers});
  }

  public update($category: Categoria){

    let headers = new HttpHeaders();

    headers = headers.append('x-token', this.authService.getToken());

    let data = {
      nombre: $category.nombre
    };

    return this.http.put<Categoria>
    (environment.backendURL + this.api + $category._id, data, {'headers':headers});
  }

  public delete($category: Categoria){

    let headers = new HttpHeaders();

    headers = headers.append('x-token', this.authService.getToken());

    return this.http.delete<Categoria>
    (environment.backendURL + this.api + $category._id, {'headers':headers});
  }
}