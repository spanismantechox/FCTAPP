import { Component, OnInit } from '@angular/core';
import { RestauranteC } from 'src/app/interfaces/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  public errorMessage='';
  public errorModificar=false;
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
        alert("Restaurante modificado correctamente!");
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
    })
  }

}
                                  