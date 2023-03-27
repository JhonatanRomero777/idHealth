import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = "api/productos/";

  constructor(private http: HttpClient){}

  public index(){
    
    let params = new HttpParams();

    params = params.append('desde', 0);
    params = params.append('limite', 0);

    return this.http.get<{total: number, productos: Producto[]}>
      (environment.backendURL + this.api, { params: params });
  }
}