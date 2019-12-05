import { Component, OnInit } from '@angular/core';
import { ClienteL } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public message='';
  public informacion=false;
  public errorMessage = '';
  public errorModificar = false;
  public errorBusqueda=false;
  public listaCliente: ClienteL[] = [];
  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {

    this.clienteService.listaCliente().then((data: any) => {
      this.listaCliente = data;
    });
  }

  modificar(e) {
    this.clienteService.modificarCliente(e).subscribe((data: any) => {
      if (data.message === 'Cliente modificado correctamente!') {
        swal("Exito!","Cliente modificado correctamente!","success");
        // Volvemos a obtener la lista para que si se cambia el nombre se vuelva a reordenar solito.
        this.clienteService.listaCliente().then((data: any) => {
          this.listaCliente = data;
        });
      } else {
        this.errorModificar = true;
        this.errorMessage = data.message;
      }
    }, (error) => {
      this.errorModificar = true;
      this.errorMessage = error.message;
    });
  }

  buscar(termino){
    this.clienteService.buscar(termino).then((lista:any)=>{
      this.listaCliente=lista;
      if(this.listaCliente.length===0){
        this.errorBusqueda=true;
      }else{
        this.errorBusqueda=false;
      }
    })
  }
  info(){
    this.informacion=true;
    this.message="puedes buscar por direccion, nombre o correo electronico";
  }
}
