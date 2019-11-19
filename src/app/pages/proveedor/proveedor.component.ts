import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  public message='';
  public errorBusqueda=false;
  public informacion=false;
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
        swal("Exito !" ," Proveedor modificado correctamente","success");
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
      if(this.listaProveedor.length===0){
        this.errorBusqueda=true;
      }else{
        this.errorBusqueda=false;
      }
    })
  }
  info(){
    this.informacion=true;
    this.message="Puedes buscar por nombre o telefono";
  }
}
