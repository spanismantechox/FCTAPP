import { Injectable } from '@angular/core';
import { Proveedor, ProveedorC } from '../interfaces/proveedor';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private http: HttpClient,
  ) { }
  public listadoProveedor: Proveedor[] = [];
  public listaProveedores() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.urlServicios}proveedor/list`).subscribe((data: any) => {
        this.listadoProveedor = data;
        resolve(this.listadoProveedor);
      });
    })
  }
  public registrarProveedor(proveedor: ProveedorC) {
    return this.http.post(`${environment.urlServicios}proveedor/alta`, proveedor);
  }

  public editarProveedor(proveedor: Proveedor) {
    return this.http.post(`${environment.urlServicios}proveedor/mod`, proveedor);
  }

  buscar(termino: string) {
    return new Promise((resolve, reject) => {
      this.listaProveedores().then(() => {
        if (termino != '') {
          this.listadoProveedor = this.listadoProveedor.filter((proveedor) => {
            return proveedor.nombre.toLowerCase().includes(termino.toLowerCase())
              || proveedor.telefono.includes(termino);
          });
        }
        resolve(this.listadoProveedor);
      });
    });
  }

}
