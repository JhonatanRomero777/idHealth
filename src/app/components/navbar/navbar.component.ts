import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  active: boolean;
  allow: string[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  $user: Usuario;
  $menuItems: RouteInfo[] = [

    //ALL
    { path: '/home', title: 'Home', active: false,
      allow: [environment.roles[0], environment.roles[1]] },
  
    { path: '/productos', title: 'Productos', active: false,
      allow: [environment.roles[0], environment.roles[1]] },
  
    { path: '/categorias', title: 'Categorias', active: false,
      allow: [environment.roles[0], environment.roles[1]] },
  
    //ADMIN
    { path: '/usuarios', title: 'Usuarios', active: false,
      allow: [environment.roles[0]] },
  ];

  private $roleSubscription: Subscription;
  private $path: any;

  constructor(public authService: AuthService, public routeService: RouteService,
              private userService: UserService, private router: Router){}

  ngOnInit(){

    this.$path = new URL(window.location.href).pathname.split("/").reverse()[0];
    
    for(let i=0; i<this.$menuItems.length; i++){
      if(this.$menuItems[i].path == ("/"+this.$path)) this.$menuItems[i].active = true;
      else this.$menuItems[i].active = false;
    }

    this.$roleSubscription = this.userService.index().subscribe((response)=>{

      if(response.usuarios){

        const val = this.authService.getUser();

        response.usuarios = response.usuarios.filter(function ($user: Usuario) {
          return $user.uid.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.$user = response.usuarios[0];
      }
    });
  }

  ngOnDestroy(){ if(this.$roleSubscription) this.$roleSubscription.unsubscribe(); }

  activar(menuItem: RouteInfo){
    for(let i=0; i<this.$menuItems.length; i++){
      if(this.$menuItems[i].title === menuItem.title) this.$menuItems[i].active = true;
      else this.$menuItems[i].active = false;
    }
  }
}