import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingresos } from 'src/app/interfaces/ingresos';
import { IngresoService } from 'src/app/services/ingreso.service';
import { GastoService } from 'src/app/services/gasto.service';
import { Restaurante } from 'src/app/interfaces/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Gastos } from 'src/app/interfaces/gastos';
import swal from 'sweetalert';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  public formularioIngreso: FormGroup;
  public formularioGasto: FormGroup;
  public errorMessage = '';
  public errorIngreso = false;
  public errorGasto = false;
  public lista: Restaurante[] = [];
  public listaP: Proveedor[] = [];

  constructor(
    private ingresoService: IngresoService,
    private gastoService: GastoService,
    private restauranteService: RestauranteService,
    private proveedorService: ProveedorService,
  ) { }

  ngOnInit() {
    this.formularioIngreso = new FormGroup({
      cantidad: new FormControl('', Validators.required),
      fuente: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      restauranteId: new FormControl('', Validators.required)
    });

    this.formularioGasto = new FormGroup({
      cantidad: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      idRestaurante: new FormControl('', Validators.required),
      idProveedor: new FormControl('', Validators.required)
    });

    this.restauranteService.listaRestuarantes().then((data: any) => {
      this.lista = data;
    });

    this.proveedorService.listaProveedores().then((data: any) => {
      this.listaP = data;
    })

  }

  agregarIngreso() {

    if (!this.formularioIngreso.controls.cantidad.errors && !this.formularioIngreso.controls.fuente.value.errors &&
      !this.formularioIngreso.controls.fecha.errors && !this.formularioIngreso.controls.restauranteId.errors) {
      let ingreso: Ingresos = {
        cantidad: this.formularioIngreso.controls.cantidad.value,
        fuente: this.formularioIngreso.controls.fuente.value,
        fecha: this.formularioIngreso.controls.fecha.value,
        restauranteId: this.formularioIngreso.controls.restauranteId.value
      }
      this.ingresoService.ingresos(ingreso).subscribe((data: any) => {
        if (data.message === 'ok') {
          swal("Exito! ","Ingreso añadido!","success");
          this.formularioIngreso.reset();
          this.errorIngreso=false;
        }else{
          this.errorIngreso=true;
          this.errorMessage=data.message;
        }
      },(error)=>{
        this.errorIngreso=true;
        this.errorMessage= error.message;
      });
    } else {
      this.errorIngreso = true;
      this.errorMessage = 'Necesitas todos los campos para apuntar un ingreso';
    }
  }
  agregarGasto() {

    if (!this.formularioGasto.controls.fecha.errors && !this.formularioGasto.controls.idRestaurante.value.errors &&
      !this.formularioGasto.controls.idProveedor.value.errors && !this.formularioGasto.controls.cantidad.errors) {
      let gasto: Gastos = {
        fecha: this.formularioGasto.controls.fecha.value,
        cantidad: this.formularioGasto.controls.cantidad.value,
        idProveedor: parseInt(this.formularioGasto.controls.idProveedor.value),
        idRestaurante: parseInt(this.formularioGasto.controls.idRestaurante.value)
      }
      this.gastoService.gastos(gasto).subscribe((data: any) => {
        if (data.message === 'ok') {
          swal("Exito!","Gasto añadido!","success");
          this.errorGasto=false;
          this.formularioGasto.reset();
        }else{
          this.errorGasto=true;
          this.errorMessage=data.message;
        }
      },(error)=>{
        this.errorGasto=true;
        this.errorMessage=error.message;
      });
    } else {
      this.errorGasto = true;
      this.errorMessage = 'Necesitas todos los campos para apuntar un gasto';
    }

  }

}
