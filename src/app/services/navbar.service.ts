import { Injectable } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navBarComponent: NavbarComponent;
  public getNavbarComponent(): NavbarComponent{ return this.navBarComponent }
  public setNavbarComponent(navbarComponent: NavbarComponent){this.navBarComponent = navbarComponent;}

  constructor() { }
}
