import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioC, UsuarioL } from '../interfaces/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RUsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  crearUsuarios(usuario: UsuarioC){
    return this.http.post(`${environment.urlServicios}usuario/alta`,usuario);
  }

  listaUsuarios(){
    return this.http.get(`${environment.urlServicios}usuario/list`);
  }

  modificarUsuarios(usuario : UsuarioL){
    return this.http.post(`${environment.urlServicios}usuario/mod`,usuario);
  }

}
