import { Component, OnInit, Input, Output, EventEmitter, Injectable, LOCALE_ID, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Restaurante } from 'src/app/interfaces/restaurante';
import { Ingreso } from 'src/app/interfaces/ingresos';
import { RestauranteComponent } from 'src/app/pages/restaurante/restaurante.component';
import { IngresoService } from 'src/app/services/ingreso.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';

@Component({
  selector: 'app-editar-ingresos',
  templateUrl: './editar-ingresos.component.html',
  styleUrls: ['./editar-ingresos.component.css']
})
export class EditarIngresosComponent implements OnInit, OnChanges {
  public dia = new Date();
  public editando = false;
  public formularioEditarIngreso: FormGroup;
  public selectRestaurante = 0;
  public selectFuente = '';

  @Input() ingreso: any;
  @Input() restaurantes: Restaurante;
  @Output() guardar = new EventEmitter<Ingreso>();
  @Output() ingresoBorrado = new EventEmitter<boolean>();
  public listaRest: Restaurante[] = [];
  constructor(
    private ingresoService: IngresoService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.ingreso.currentValue !== 'undefined' && typeof changes.restaurantes.currentValue !== 'undefined') {
      this.selectRestaurante = changes.ingreso.currentValue.idRestaurante;
      this.selectFuente = changes.ingreso.currentValue.fuente;
    }
  }
  ngOnInit() {

    this.formularioEditarIngreso = new FormGroup({
      fecha: new FormControl({
        value:
          this.datePipe.transform(this.ingreso.fecha, 'yyyy-MM-dd', this.locale),
        disabled: true
      }, Validators.required),
      cantidad: new FormControl({ value: this.ingreso.cantidad, disabled: true }, Validators.required),
      nombre_restaurante: new FormControl({ value: this.ingreso.nombre_restaurante, disabled: true }, Validators.required),
      fuente: new FormControl({ value: this.ingreso.fuente, disabled: true }, Validators.required)
    });
  }

  habilitar() {

    this.editando = true;

    this.formularioEditarIngreso.controls.fecha.disable();
    this.formularioEditarIngreso.controls.nombre_restaurante.disable();
    this.formularioEditarIngreso.controls.cantidad.enable();
    this.formularioEditarIngreso.controls.fuente.disable();

  }


  guardarIngreso() {
    if (this.formularioEditarIngreso.controls.cantidad.errors) {
      swal("Error!", "introduce un valor superior a 0", "error");
    } else {
      this.editando = false;
      let fecha = this.formularioEditarIngreso.controls.fecha.value.split(".")[0];
      fecha = fecha.replace(" ", "T");
      this.ingreso.fecha = fecha;
      this.ingreso.nombre_restaurante = this.formularioEditarIngreso.controls.nombre_restaurante.value;
      this.ingreso.cantidad = this.formularioEditarIngreso.controls.cantidad.value;
      this.ingreso.fuente = this.formularioEditarIngreso.controls.fuente.value;

      let g: Ingreso = {
        idIngreso: this.ingreso.idIngreso,
        cantidad: this.ingreso.cantidad,
        fuente: this.ingreso.fuente,
        fecha: this.ingreso.fecha,
        idRestaurante: parseInt(this.selectRestaurante + ""),
        nombre_restaurante: this.ingreso.nombre_restaurante
      }
      this.guardar.emit(g);

      this.formularioEditarIngreso.controls.fecha.disable();
      this.formularioEditarIngreso.controls.nombre_restaurante.disable();
      this.formularioEditarIngreso.controls.cantidad.disable();
      this.formularioEditarIngreso.controls.fuente.disable();
    }
  }

  borrar() {

    this.ingreso;
    this.editando = false;

    let idIngreso = this.ingreso.idIngreso;

    this.ingresoService.eleiminarIngreso(idIngreso).subscribe((data: any) => {
      swal("Exito!", data.message, "success");
      this.ingresoBorrado.emit(true);
    })
  }

}
