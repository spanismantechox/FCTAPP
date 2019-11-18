import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    private route :Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    let userType = localStorage.getItem('userType');
    if(localStorage.getItem("logged")){
      if(userType === 'User') {
        if( state.url === '/crearFacturaUser') {
          return true;
        } else {
          return false;
        }
      } else if(userType === 'Admin') {
        return true;
      }
    }
    this.route.navigateByUrl('');
    return false;
  }
}
