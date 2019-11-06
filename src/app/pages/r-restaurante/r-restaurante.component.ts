import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { RestauranteC } from 'src/app/interfaces/restaurante';
import swal from 'sweetalert';
@Component({
  selector: 'app-r-restaurante',
  templateUrl: './r-restaurante.component.html',
  styleUrls: ['./r-restaurante.component.css']
})
export class RRestauranteComponent implements OnInit {
  public errorMessage='';
  public errorRestaurante=false;
  public formularioRegistroRestaurante: FormGroup;
  constructor(
    private restaruanteService: RestauranteService,
  ) { }

  ngOnInit() {
    this.formularioRegistroRestaurante= new FormGroup({
      nombre: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
      cif: new FormControl('',Validators.required),
      cp: new FormControl('',Validators.required),
      nombreFiscal: new FormControl('',Validators.required)
    })
  }

  altaRestaurante(){
    if(!this.formularioRegistroRestaurante.controls.nombre.errors && !this.formularioRegistroRestaurante.controls.direccion.errors &&
      !this.formularioRegistroRestaurante.controls.telefono.errors && !this.formularioRegistroRestaurante.controls.cif.errors &&
      !this.formularioRegistroRestaurante.controls.cp.errors && !this.formularioRegistroRestaurante.controls.nombreFiscal.errors){
        let restaurante : RestauranteC={
          nombre:this.formularioRegistroRestaurante.controls.nombre.value,
          direccion:this.formularioRegistroRestaurante.controls.direccion.value,
          telefono:this.formularioRegistroRestaurante.controls.telefono.value,
          cif:this.formularioRegistroRestaurante.controls.cif.value,
          cp:this.formularioRegistroRestaurante.controls.cp.value,
          nombreFiscal:this.formularioRegistroRestaurante.controls.nombreFiscal.value
        }
        this.restaruanteService.crearRestaurante(restaurante).subscribe((data:any)=>{
          if(data.message==='Restaurante dado de alta correctamente!'){
            swal("Exito!","Restaurante creado correctamente!","success");
            
          }else{
            this.errorRestaurante=true;
            this.errorMessage=data.message;
          }
        },(error)=>{
          this.errorRestaurante=true;
          this.errorMessage=error.message;
        });
      }else{
        this.errorRestaurante=true;
        this.errorMessage='Todos los campos deben de estar rellenos para poder crear un restaurante';
      }

  }

}
