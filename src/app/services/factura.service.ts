import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Factura, FacturaL } from '../interfaces/factura';
import { resolve } from 'url';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) { }
  public listadoFacturas: FacturaL[] = []

  crearFactura(factura: Factura) {
    return this.http.post(`${environment.urlServicios}factura/crear`, factura);


  }

  listaFactura() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.urlServicios}factura/list`).subscribe((data: any) => {
        this.listadoFacturas = data.factura;
        resolve(this.listadoFacturas);
      });
    })
  }

  exportarFactura(id: number) {
    return this.http.get(`${environment.urlServicios}factura/pdf/${id}`);
  }
  buscar(termino: string) {
    return new Promise((resolve, reject) => {
      this.listaFactura().then(() => {
        if (termino != '') {
          this.listadoFacturas = this.listadoFacturas.filter((factura) => {
            let fechaFact = this.datePipe.transform(factura.fecha, 'dd-MM-yyyy', this.locale);
            
            return factura.concepto.toLowerCase().includes(termino.toLowerCase())
              || factura.nombreCliente.toLowerCase().includes(termino.toLowerCase())
              || factura.nombreRestaurante.toLowerCase().includes(termino.toLowerCase())
              || (fechaFact).toString().includes(termino);
          });
        }
        resolve(this.listadoFacturas);
      });
    });
  }

  listaFacturaMes(mes:number){
    
    return this.http.get(`${environment.urlServicios}factura/list-month/${mes}`);
  }
}
