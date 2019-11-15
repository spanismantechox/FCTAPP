import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario : Usuario; 
  constructor(
    private http : HttpClient
  ) { }


  public login (login :Login){
    
    return this.http.post(`${environment.urlServicios}usuario/login/`,login);
  }
}


