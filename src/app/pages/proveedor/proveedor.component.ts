import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  public erroMessage = '';
  public errorModificar = false;
  public listaProveedor: Proveedor[] = [];
  constructor(
    private proveedorService: ProveedorService,
  ) { }

  ngOnInit() {
    this.proveedorService.listaProveedores().then((data: any) => {
      this.listaProveedor = data;
    });
  }

  modificar(e) {
    this.proveedorService.editarProveedor(e).subscribe((data: any) => {
      if (data.message === 'Proveedor modificado correctamente!') {
        alert("Proveedor modificado correctamente");
      } else {
        this.errorModificar = true;
        this.erroMessage = data.message;
      }
    }, (error) => {
      this.errorModificar = true;
      this.erroMessage = error.message;
    });
  }
  buscar(termino){
    this.proveedorService.buscar(termino).then((lista:any)=>{
      this.listaProveedor=lista;
    })
  }
  
}
