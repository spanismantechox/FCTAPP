import { Component, OnInit } from '@angular/core';
import { IngresoL } from 'src/app/interfaces/ingresos';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-l-ingreso',
  templateUrl: './l-ingreso.component.html',
  styleUrls: ['./l-ingreso.component.css']
})
export class LIngresoComponent implements OnInit {
  public errorMessage='';
  public errorIngreso=false;
  public listaIngreso: IngresoL[]=[];
  constructor(
    private ingresoService: IngresoService,
  ) { }

  ngOnInit() {
    
    this.ingresoService.listaIngresos().subscribe((data:any)=>{
      this.listaIngreso=data;
    });
  }

  modificar(e){
    
    this.ingresoService.modificarIngresos(e).subscribe((data:any)=>{
      if(data.message==='Ingreso modificado correctamente!'){
        alert(data.message);
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
    this.ingresoService.listaIngresos().subscribe((data:any)=>{
      this.listaIngreso=data;
    })
  }




}
