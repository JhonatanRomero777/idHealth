import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class Role1Guard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService,
              private routeService: RouteService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.index().pipe(
      map( (response): boolean => {

        if(response.usuarios){

          const val = this.authService.getUser();
  
          response.usuarios = response.usuarios.filter(function ($user: Usuario) {
            return $user.uid.toLowerCase().indexOf(val) !== -1 || !val;
          });
  
          if(response.usuarios[0].rol === environment.roles[0]) return true;
          
          this.routeService.goToDashboard();
          return false;
        }

        return false;
      })
    );
  }
}