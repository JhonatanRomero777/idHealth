import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = "api/productos/";

  constructor(private http: HttpClient, private interceptorService: InterceptorService){}

  public index(){

    return this.http.get<{total: number, productos: Producto[]}>
      (environment.backendURL + this.api, this.interceptorService.allListParameter());
  }

  public create($name: string, $category: string){

    let data = {
      nombre: $name,
      categoria: $category
    };

    return this.http.post<Producto>
    (environment.backendURL + this.api, data, this.interceptorService.tokenHeader());
  }

  public update($product: Producto, $category: string){

    let data = {
      nombre: $product.nombre,
      categoria: $category
    };

    return this.http.put<Producto>
    (environment.backendURL + this.api + $product._id, data, this.interceptorService.tokenHeader());
  }

  public delete($product: Producto){

    return this.http.delete<Producto>
    (environment.backendURL + this.api + $product._id, this.interceptorService.tokenHeader());
  }
}