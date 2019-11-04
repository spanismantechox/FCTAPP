import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante, RestauranteC } from '../interfaces/restaurante';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  
  constructor(
    private http:HttpClient,
  ) { }
public listadoRestaurantes: Restaurante[]=[];
public listaRestuarantes(){
  return new Promise((resolve, reject)=>{
    
    this.http.get(`${environment.urlServicios}restaurante/list`).subscribe((data:any)=>{
      this.listadoRestaurantes=data;
      resolve(this.listadoRestaurantes);
    
    });
  });
   
}

public crearRestaurante(restaurante:RestauranteC){
  return this.http.post(`${environment.urlServicios}restaurante/alta`,restaurante);
}

public modificarRestaurante(restaurante: RestauranteC){
  return this.http.post(`${environment.urlServicios}restaurante/mod`,restaurante);
}

public datosRestaurante(id:number){
  return this.http.get(`${environment.urlServicios}restaurante/most/${id}`);
}
buscar(termino:string){
  return new Promise((resolve, reject)=>{
    this.listaRestuarantes().then(() => {
      if(termino!=''){
        this.listadoRestaurantes=this.listadoRestaurantes.filter((restaurante)=>{
          return restaurante.nombre.toLowerCase().includes(termino.toLowerCase())
          || restaurante.direccion.toLowerCase().includes(termino.toLowerCase())
          || restaurante.nombreFiscal.toLowerCase().includes(termino.toLowerCase());
        });
      }
      resolve(this.listadoRestaurantes);
    });
  });
}




}
