import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    private route :Router
  ) { }

  canActivate():boolean{
    if(localStorage.getItem("logged")){
      return true;
    }
    this.route.navigateByUrl('');
    return false;
  }
}
