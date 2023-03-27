import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private api = "api/buscar/";

  constructor(private http: HttpClient){}

  public categorias($search: string){

    return this.http.get<{results: Categoria[]}>
      (environment.backendURL + this.api + "categorias/" + $search);
  }
}