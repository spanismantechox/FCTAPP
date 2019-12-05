import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Ingresos, Ingreso, IngresoL } from '../interfaces/ingresos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {

  }
  public listadoIngreso: IngresoL;

  public ingresos(ingreso: Ingresos) {
    return this.http.post(`${environment.urlServicios}ingreso/ingresar/`, ingreso);
  }

  public listaIngresos() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.urlServicios}ingreso/list`).subscribe((data: any) => {
        this.listadoIngreso = data;
        resolve(this.listadoIngreso);
      });
    });

  }

  public modificarIngresos(ingreso: Ingreso) {

    return this.http.post(`${environment.urlServicios}ingreso/mod`, ingreso);
  }

  public eleiminarIngreso(ingreso: Ingreso) {
    debugger;
    return this.http.delete(`${environment.urlServicios}ingreso/del/${ingreso}`);
  }

  public fuentesIngreso(periodo: any, numero: any) {
    let params = new HttpParams();
    params = params.append('periodo', periodo);
    params = params.append('numero', numero);
    return this.http.get(`${environment.urlServicios}ingreso/fuentes-ingreso/`, { params: params });
  }

  public fuentesIngresoNombre(periodo: any, numero: any, id: any) {

    let params = new HttpParams();
    params = params.append('periodo', periodo);
    params = params.append('numero', numero);
    params = params.append('id', id);
    return this.http.get(`${environment.urlServicios}ingreso/fuentes-ingreso-id/`, { params: params });
  }

  buscar(termino: string) {
    return new Promise((resolve, reject) => {
      this.listaIngresos().then(() => {
        if (termino != '') {
          this.listadoIngreso.ingreso = this.listadoIngreso.ingreso.filter((ingreso) => {
            let fechaIngreso = this.datePipe.transform(ingreso.fecha, 'dd-MM-yyyy', this.locale);

            return ingreso.fuente.toLowerCase().includes(termino.toLowerCase())
              || ingreso.nombre_restaurante.toLowerCase().includes(termino.toLowerCase())
              || (fechaIngreso).toString().includes(termino);
          });
        }
        resolve(this.listadoIngreso);
      });
    });
  }
}
