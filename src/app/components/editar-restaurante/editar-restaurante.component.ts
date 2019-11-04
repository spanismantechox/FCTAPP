import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Restaurante } from 'src/app/interfaces/restaurante';

@Component({
  selector: 'app-editar-restaurante',
  templateUrl: './editar-restaurante.component.html',
  styleUrls: ['./editar-restaurante.component.css']
})
export class EditarRestauranteComponent implements OnInit {
  public formModRestaurante: FormGroup;
  public editing = false;
  @Input() restaurante: Restaurante;
  @Output() guardar = new EventEmitter<Restaurante>();
  constructor() { }

  ngOnInit() {
    this.formModRestaurante= new FormGroup({
      nombre: new FormControl({value: this.restaurante.nombre, disabled: true },Validators.required),
      direccion: new FormControl({value: this.restaurante.direccion, disabled: true },Validators.required),
      telefono: new FormControl({value: this.restaurante.telefono, disabled: true },Validators.required),
      cif: new FormControl({value: this.restaurante.cif, disabled: true },Validators.required),
      cp: new FormControl({value: this.restaurante.cp, disabled: true },Validators.required),
      nombreFiscal: new FormControl({value:this.restaurante.nombreFiscal, disabled: true },Validators.required)
    })
  }

  enableForm(){
    this.formModRestaurante.controls.nombre.enable();
    this.formModRestaurante.controls.direccion.enable();
    this.formModRestaurante.controls.telefono.enable();
    this.formModRestaurante.controls.cif.enable();
    this.formModRestaurante.controls.cp.enable();
    this.formModRestaurante.controls.nombreFiscal.enable();
    this.editing = true;
  }

  guardarRest() {
    this.editing = false;

    this.restaurante.nombre = this.formModRestaurante.controls.nombre.value;
    this.restaurante.direccion = this.formModRestaurante.controls.direccion.value;
    this.restaurante.telefono = this.formModRestaurante.controls.telefono.value;
    this.restaurante.cif = this.formModRestaurante.controls.cif.value;
    this.restaurante.cp = this.formModRestaurante.controls.cp.value;
    this.restaurante.nombreFiscal = this.formModRestaurante.controls.nombreFiscal.value;
    this.guardar.emit(this.restaurante);

    this.formModRestaurante.controls.nombre.disable();
    this.formModRestaurante.controls.direccion.disable();
    this.formModRestaurante.controls.telefono.disable();
    this.formModRestaurante.controls.cif.disable();
    this.formModRestaurante.controls.cp.disable();
    this.formModRestaurante.controls.nombreFiscal.disable();

  }
}
