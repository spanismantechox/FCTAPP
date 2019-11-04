import { Injectable } from '@angular/core';
import { Ingresos, Ingreso } from '../interfaces/ingresos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
 
  constructor(
    private http: HttpClient
  ) { 
   
  }

  public ingresos(ingreso:Ingresos){
    return this.http.post(`${environment.urlServicios}ingreso/ingresar/`,ingreso);
  }

  public listaIngresos(){
    return this.http.get(`${environment.urlServicios}ingreso/list`);
  }

  public modificarIngresos(ingreso : Ingreso){
    
    return this.http.post(`${environment.urlServicios}ingreso/mod`,ingreso);
  }

  public eleiminarIngreso(ingreso : Ingreso){
    debugger;
    return this.http.delete(`${environment.urlServicios}ingreso/del/${ingreso}`);
  }

  public fuentesIngreso() {
    return this.http.get(`${environment.urlServicios}ingreso/fuentes-ingreso`);
  }
}
