import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-proveedores',
  templateUrl: './editar-proveedores.component.html',
  styleUrls: ['./editar-proveedores.component.css']
})
export class EditarProveedoresComponent implements OnInit {
  public editando = false;
  public formularioEditarProveedor: FormGroup;
  @Input() proveedor: Proveedor;
  @Output() guardar = new EventEmitter<Proveedor>();
  constructor() { }

  ngOnInit() {
    this.formularioEditarProveedor = new FormGroup({
      nombre: new FormControl({ value: this.proveedor.nombre, disabled: true }, Validators.required),
      telefono: new FormControl({ value: this.proveedor.telefono, disabled: true }, Validators.required)
    })
  }


  habilitar(){
    this.formularioEditarProveedor.controls.nombre.enable();
    this.formularioEditarProveedor.controls.telefono.enable();
    this.editando=true;
  }

  guardarProv(){
    this.editando=false;

    this.proveedor.nombre = this.formularioEditarProveedor.controls.nombre.value;
    this.proveedor.telefono= this.formularioEditarProveedor.controls.telefono.value;

    this.guardar.emit(this.proveedor);

    this.formularioEditarProveedor.controls.nombre.disable();
    this.formularioEditarProveedor.controls.telefono.disable();
  }

}
