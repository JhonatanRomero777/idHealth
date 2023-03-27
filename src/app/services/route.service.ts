import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  public goToLogin() { this.router.navigate(['/']); }

  public goToDashboard(menuItem: string = "home") { this.router.navigate(['/dashboard/'+menuItem]); }
}