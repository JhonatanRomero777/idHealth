import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = "api/categorias/";

  constructor(private http: HttpClient, private interceptorService: InterceptorService){}

  public index(){

    return this.http.get<{total: number, categorias: Categoria[]}>
      (environment.backendURL + this.api, this.interceptorService.allListParameter());
  }

  public create($name: string){

    let data = {
      nombre: $name
    };

    return this.http.post<Categoria>
    (environment.backendURL + this.api, data, this.interceptorService.tokenHeader());
  }

  public update($category: Categoria){

    let data = {
      nombre: $category.nombre
    };

    return this.http.put<Categoria>
    (environment.backendURL + this.api + $category._id, data, this.interceptorService.tokenHeader());
  }

  public delete($category: Categoria){

    return this.http.delete<Categoria>
    (environment.backendURL + this.api + $category._id, this.interceptorService.tokenHeader());
  }
}