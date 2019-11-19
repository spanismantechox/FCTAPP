import { Component, OnInit } from '@angular/core';
import { RestauranteC } from 'src/app/interfaces/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  public errorMessage='';
  public errorBusqueda=false;
  public message='';
  public errorModificar=false;
  public informacion=false;
  public listaRestaurante: RestauranteC[] = [];
  constructor(
    private restauranteService: RestauranteService,
  ) { }

  ngOnInit() {

    this.restauranteService.listaRestuarantes().then((data: any) => {
      this.listaRestaurante = data;
    });
  }

  modificar(e){
    this.restauranteService.modificarRestaurante(e).subscribe((data:any)=>{
      if(data.message==='Restaurante modificado correctamente!'){
        swal("Exito!","Restaurante modificado correctamente!", "success");
        
      }else{
        this.errorModificar=true;
        this.errorMessage=data.message;
      }
    },(error)=>{
      this.errorModificar=true;
      this.errorMessage=error.message;
    });
  }

  buscar(termino){
    this.restauranteService.buscar(termino).then((lista:any)=>{
      this.listaRestaurante=lista;
      if(this.listaRestaurante.length===0){
        this.errorBusqueda=true;
      }else{
        this.errorBusqueda=false;
      }
    })
  }

  info(){
    this.informacion=true;
    this.message="Puedes buscar por nombre, dirección o por nombre físcal";
  }

}
                                  