import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GastosL, GastoItem, GastoM } from 'src/app/interfaces/gastos';
import { Restaurante } from 'src/app/interfaces/restaurante';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { GastoService } from 'src/app/services/gasto.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';


@Component({
  selector: 'app-editar-gastos',
  templateUrl: './editar-gastos.component.html',
  styleUrls: ['./editar-gastos.component.css']
})
export class EditarGastosComponent implements OnInit, OnChanges {
  public dia=new Date(); 
  public editando = false;
  public formularioEditarGastos: FormGroup;
  public selectRestaurante = 0;
  public selectProveedor = 0;
  @Input() gasto: any;
  @Input() restaurantes: Restaurante;
  @Input() proveedores: Proveedor;
  @Output() guardar = new EventEmitter<GastoM>();
  @Output() gastoBorrado = new EventEmitter<boolean>();
  public listaProv: Proveedor[] = [];
  public listaRest: Restaurante[] = [];
  constructor(
    private gastoService: GastoService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.gasto.currentValue !== 'undefined' && typeof changes.restaurantes.currentValue !== 'undefined' && typeof changes.proveedores.currentValue !== 'undefined') {
      this.selectRestaurante = changes.gasto.currentValue.idRestaurante;
      this.selectProveedor = changes.gasto.currentValue.idProveedor;

    }
  }
  ngOnInit() {
    this.formularioEditarGastos = new FormGroup({
      fecha: new FormControl({ value: 
        this.datePipe.transform(this.gasto.fecha, 'yyyy-MM-dd', this.locale),
         disabled: true }, Validators.required),
      nombre_restaurante: new FormControl({ value: this.gasto.nombre_restaurante, disabled: true }, Validators.required),
      nombre_proveedor: new FormControl({ value: this.gasto.nombre_proveedor, disabled: true }, Validators.required),
      cantidad: new FormControl({ value: this.gasto.cantidad, disabled: true }, Validators.required)
    });

  }

  habilitar() {
    this.editando = true;

    this.formularioEditarGastos.controls.fecha.disable();
    this.formularioEditarGastos.controls.nombre_restaurante.disable();
    this.formularioEditarGastos.controls.nombre_proveedor.disable();
    this.formularioEditarGastos.controls.cantidad.enable();
  }

  guardarGasto() {
    this.editando = false;

    let fecha = this.formularioEditarGastos.controls.fecha.value.split(".")[0];
    fecha = fecha.replace(" ", "T");

    this.gasto.fecha = fecha;
    this.gasto.nombre_restaurante = this.formularioEditarGastos.controls.nombre_restaurante.value;
    this.gasto.nombre_proveedor = this.formularioEditarGastos.controls.nombre_proveedor.value;
    this.gasto.cantidad = this.formularioEditarGastos.controls.cantidad.value;


    let g: GastoM = {
      cantidad: this.gasto.cantidad,
      fecha: this.gasto.fecha,
      idGasto: this.gasto.idGasto,
      idProveedor: parseInt(this.selectProveedor + ""),
      idRestaurante: parseInt(this.selectRestaurante + "")
    }
    this.guardar.emit(g);

    this.formularioEditarGastos.controls.fecha.disable();
    this.formularioEditarGastos.controls.nombre_restaurante.disable();
    this.formularioEditarGastos.controls.nombre_proveedor.disable();
    this.formularioEditarGastos.controls.cantidad.disable();
  }
  borrar(){ 
    this.gasto;
    this.editando=false;
    
    let idGasto=this.gasto.idGasto;
    this.gastoService.delGastos(idGasto).subscribe((data:any)=> {
      swal("Exito!",data.message,"success");
      this.gastoBorrado.emit(true);
    }); 

  }



}
