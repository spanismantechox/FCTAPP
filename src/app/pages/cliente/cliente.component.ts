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
  public errorMessage = '';
  public errorModificar = false;
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
    })
  }

}
