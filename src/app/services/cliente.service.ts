import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/clientes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(
    private http: HttpClient
  ) { }
  public listadoClientes: Cliente[]=[];

  altalCliente(cliente:Cliente){
    return this.http.post(`${environment.urlServicios}cliente/alta`,cliente)
  }

  listaCliente(){
    return new Promise((resolve,reject)=>{
      this.http.get(`${environment.urlServicios}cliente/list`).subscribe((data:any)=>{
        this.listadoClientes=data;
        resolve(this.listadoClientes);
      });
    });
  }

  modificarCliente(cliente:Cliente){
    return this.http.post(`${environment.urlServicios}cliente/mod`,cliente);
  }

  datosCliente(id:any){
    return this.http.get(`${environment.urlServicios}cliente/most/${id}`);
  }

  buscar(termino:string){
    return new Promise((resolve,reject)=>{
      this.listaCliente().then(()=>{
        if(termino!=''){
          this.listadoClientes= this.listadoClientes.filter((cliente)=>{
            return cliente.direccion.toLowerCase().includes(termino.toLowerCase())
            || cliente.nombre.toLowerCase().includes(termino.toLowerCase())
            || cliente.email.toLowerCase().includes(termino.toLowerCase());
          });
        }
        resolve(this.listadoClientes)
      });
    });
  }

}
