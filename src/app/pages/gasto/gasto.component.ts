import { Component, OnInit } from '@angular/core';
import { GastosL, GastoM } from 'src/app/interfaces/gastos';
import { GastoService } from 'src/app/services/gasto.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {
  public errorGasto = false;
  public errorMessage = '';
  public mostrarMensaje = false;
  public errorBusqueda=false;
  public message='';
  public informacion=false;
  public listaGasto: GastosL[] = [];
  constructor(
    private gastoService: GastoService,
  ) { }

  ngOnInit() {
    this.gastoService.listaGastos().then((data: any) => {
      this.listaGasto = data;
      if (data.gastos <= 0) {
        this.mostrarMensaje = true;
      } else {
        this.mostrarMensaje = false;
      }
    });

  }



  modificar(e) {

    this.gastoService.modificarGastos(e).subscribe((data: any) => {
      if (data.message === 'Gasto modificado correctamente!') {
        swal("Exito!", "Gasto modificado correctamente!", "success");
      } else {
        this.errorGasto = true;
        this.errorMessage = data.message;
      }
    }, (error) => {
      this.errorGasto = true;
      this.errorMessage = error.message;
    });

  }

  recargarGastos(e) {
    this.gastoService.listaGastos().then((data: any) => {
      this.listaGasto = data;
      if (data.gastos <= 0) {
        this.mostrarMensaje = true;
      } else {
        this.mostrarMensaje = false;
      }
    });

  }
  buscar(termino){
    this.gastoService.buscar(termino).then((lista:any)=>{
      this.listaGasto=lista.gastos;
      if(this.listaGasto.length===0){
        this.errorBusqueda=true;
      }else{
        this.errorBusqueda=false;
      }
    })
  }
  info(){
    this.informacion=true;
    this.message="puedes buscar por fecha, nombre del proveedor o nombre del restaurante";
  }
}
