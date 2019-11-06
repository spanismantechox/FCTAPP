import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProveedorC } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-r-proveedor',
  templateUrl: './r-proveedor.component.html',
  styleUrls: ['./r-proveedor.component.css']
})
export class RProveedorComponent implements OnInit {
  public formularioRegistroProveedor: FormGroup;
  public errorProveedor=false;
  public errorMessage='';
  constructor(
    private proovedorService : ProveedorService,
  ) { }

  ngOnInit() {
    this.formularioRegistroProveedor = new FormGroup({
      nombre: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required)
    });
  }

  crearProveedor(){
    if(!this.formularioRegistroProveedor.controls.nombre.errors && !this.formularioRegistroProveedor.controls.telefono.errors){
      let proveedor : ProveedorC={
        nombre:this.formularioRegistroProveedor.controls.nombre.value,
        telefono: this.formularioRegistroProveedor.controls.telefono.value
      }
      this.proovedorService.registrarProveedor(proveedor).subscribe((data:any)=>{
        if(data.message==='Proveedor dado de alta correctamente!'){
          swal("Exito!",'Proveedor creado correctamente',"success");
        }else{
          this.errorProveedor=true;
          this.errorMessage=data.message;
        }
      },(error)=>{
        this.errorProveedor=true;
        this.errorMessage=error.message;
      });
    }else{
      this.errorProveedor=true;
      this.errorMessage='Necesitas todos los campos para poder crear un proveedor';
    }
  }

}
