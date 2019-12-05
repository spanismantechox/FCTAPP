import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gastos, GastoM, GastoItem, GastosL } from '../interfaces/gastos';
import { DatePipe } from '@angular/common';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    private http:HttpClient,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) { }
  public listadoGastos:GastosL;

  public gastos(gasto:Gastos){
    return this.http.post(`${environment.urlServicios}gasto/salida`,gasto);
  }

  public listaGastos(){
    return new Promise((resolve,reject)=>{
      this.http.get(`${environment.urlServicios}gasto/list`).subscribe((data:any)=>{
        this.listadoGastos = data;
        resolve(this.listadoGastos);
      });
    });
    
  }

  public modificarGastos(gasto: GastoM){
    return this.http.post(`${environment.urlServicios}gasto/mod`,gasto);
  }

  public delGastos(gasto: GastoM){    
    return this.http.delete(`${environment.urlServicios}gasto/del/${gasto}`)
  }
  buscar(termino:string){
    return new Promise((resolve,reject)=>{
      this.listaGastos().then(()=>{
        if(termino!=''){
          
          this.listadoGastos.gastos = this.listadoGastos.gastos.filter((gastos)=>{
            let fechaGasto = this.datePipe.transform(gastos.fecha, 'dd-MM-yyyy', this.locale);
            return gastos.nombre_proveedor.toLowerCase().includes(termino.toLowerCase())
            || gastos.nombre_restaurante.toLowerCase().includes(termino.toLowerCase())
            || (fechaGasto).toString().includes(termino);
          });
        }
        resolve(this.listadoGastos);
      });
    });
  }
}
