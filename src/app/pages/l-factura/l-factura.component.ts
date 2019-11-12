import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { FacturaL, Factura } from 'src/app/interfaces/factura';
import swal from 'sweetalert';
@Component({
  selector: 'app-l-factura',
  templateUrl: './l-factura.component.html',
  styleUrls: ['./l-factura.component.css']
})
export class LFacturaComponent implements OnInit {
  public message='';
  public informacion=false;
  public listaFactura : FacturaL[]=[];
  constructor(
    private facturaService: FacturaService,
  ) { }

  ngOnInit() {
   
    this.facturaService.listaFactura().then((data:any)=>{
      this.listaFactura=data;
    });
  }

  crearPdf(id:number){
    
    this.facturaService.exportarFactura(id).subscribe((data:any)=>{
      if(data.message==='factura creada con exito!'){
        swal("Exito!",data.message,"success");
      }else{
        swal("Fallo!", data.message ,"success");
      }
    });
  }

  buscar(termino){
    this.facturaService.buscar(termino).then((lista: any) => {
      this.listaFactura = lista;
    });
  }
  info(){
    this.informacion=true;
    this.message="puedes buscar por fecha, concepto, nombre del cliente o nombre del restaurante";
  }
}
