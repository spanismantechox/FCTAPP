import { Component, OnInit } from '@angular/core';
import { IngresoL } from 'src/app/interfaces/ingresos';
import { IngresoService } from 'src/app/services/ingreso.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-l-ingreso',
  templateUrl: './l-ingreso.component.html',
  styleUrls: ['./l-ingreso.component.css']
})
export class LIngresoComponent implements OnInit {
  public errorMessage='';
  public errorIngreso=false;
  public mostrarMensaje=false;
  public errorBusqueda=false;
  public informacion=false;
  public message='';
  public listaIngreso: IngresoL[]=[];
  constructor(
    private ingresoService: IngresoService,
  ) { }

  ngOnInit() {
    
    this.ingresoService.listaIngresos().then((data:any)=>{
      this.listaIngreso=data;
      if(data.ingresos <= 0) {
        this.mostrarMensaje = true;
      }else {
        this.mostrarMensaje = false;
      }
    });
    
  }

  modificar(e){
    
    this.ingresoService.modificarIngresos(e).subscribe((data:any)=>{
      if(data.message==='Ingreso modificado correctamente!'){
        swal("Exito!",data.message,"success");
      }else{
        this.errorIngreso=true;
        this.errorMessage=data.message;
      }
    },(error)=>{
      this.errorIngreso=true;
      this.errorMessage=error.message;
    });
  }

  recargarIngresos(e){
    this.ingresoService.listaIngresos().then((data:any)=>{
      this.listaIngreso=data;
      if(data.ingreso <= 0) {
        this.mostrarMensaje = true;
      }else {
        this.mostrarMensaje = false;
      }
    });
  }
  buscar(termino){
    this.ingresoService.buscar(termino).then((lista:any)=>{
      this.listaIngreso=lista.ingreso;
      if(this.listaIngreso.length===0){
        this.errorBusqueda=true;
      }else{
        this.errorBusqueda=false;
      }
    })
  }

  info(){
    this.informacion=true;
    this.message="puedes buscar por nombre del restaurante, fecha o fuente"
  }



}
