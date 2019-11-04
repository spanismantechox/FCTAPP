import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gastos, GastosL, GastoM } from '../interfaces/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    private http:HttpClient,
  ) { }

  public gastos(gasto:Gastos){
    return this.http.post(`${environment.urlServicios}gasto/salida`,gasto);
  }

  public listaGastos(){
    return this.http.get(`${environment.urlServicios}gasto/list`);
  }

  public modificarGastos(gasto: GastoM){
    return this.http.post(`${environment.urlServicios}gasto/mod`,gasto);
  }

  public delGastos(gasto: GastoM){    
    return this.http.delete(`${environment.urlServicios}gasto/del/${gasto}`)
  }
}
