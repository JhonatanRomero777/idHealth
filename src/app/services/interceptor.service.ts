import { HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService:AuthService) { }

  tokenHeader(): {headers: HttpHeaders} {
    return { headers: new HttpHeaders().append('x-token', this.authService.getToken()) }
  }

  allListParameter(): {params: HttpParams} {
    let params = new HttpParams();

    params = params.append('desde', 0);
    params = params.append('limite', 0);

    return {params};
  }
}