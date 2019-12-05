import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Restaurante, RestauranteC } from 'src/app/interfaces/restaurante';
import { ClienteL, Cliente } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/interfaces/factura';
import swal from 'sweetalert';
declare var $: any;
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  public dia = new Date();
  public errrorRestaurante = false;
  public errorMessage = '';
  public lista: Restaurante[] = [];
  public listaC: ClienteL[] = [];
  public formularioFactura: FormGroup;
  public formularioRestaurante: FormGroup;
  public formularioCliente: FormGroup;
  restaurante: RestauranteC;
  cliente: Cliente;
  public formsCorrectos: boolean[] = [false, false, false];
  public slideActual: number = 0;
  public clickNextButton: boolean = false;
  constructor(
    private restauranteService: RestauranteService,
    private clienteService: ClienteService,
    private facturaService: FacturaService,
  ) { }


  ngOnInit() {
    $('.carousel').carousel('pause');
    $('.carousel').on('slide.bs.carousel', (e) => {
      if (!this.clickNextButton) {
        this.siguiente(e.from, e.direction);
      }
      this.clickNextButton = false;
      if (e.to != 0) {
        if (this.formsCorrectos[e.to - 1]) {
          return true;
        }
      } else if (e.to === 0) {
        return true;
      }
      return false;
    });

    this.formularioFactura = new FormGroup({
      fecha: new FormControl('', Validators.required),
      concepto: new FormControl('', Validators.required),
      iva: new FormControl('', Validators.required),
      totalC: new FormControl('', Validators.required),
      totalF: new FormControl('', Validators.required),
    });
    this.formularioRestaurante = new FormGroup({
      restauranteId: new FormControl('', Validators.required),
      direccion: new FormControl({ value: '', disabled: true }, Validators.required),
      telefono: new FormControl({ value: '', disabled: true }, Validators.required),
      cif: new FormControl({ value: '', disabled: true }, Validators.required),
      cp: new FormControl({ value: '', disabled: true }, Validators.required),
      noF: new FormControl({ value: '', disabled: true }, Validators.required),
    });
    this.formularioCliente = new FormGroup({
      clienteId: new FormControl('', Validators.required),
      dir: new FormControl({ value: '', disabled: true }, Validators.required),
      cifC: new FormControl({ value: '', disabled: true }, Validators.required),
      cpC: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.required),
    });
    this.restauranteService.listaRestuarantes().then((data: any) => {
      this.lista = data;
    });
    this.clienteService.listaCliente().then((data: any) => {
      this.listaC = data;
    })
  }

  cambioRestaurante() {
    this.restauranteService.datosRestaurante(this.formularioRestaurante.controls.restauranteId.value).subscribe((data: any) => {
      this.restaurante = data.restaurante;
      this.formularioRestaurante.controls.direccion.setValue(this.restaurante.direccion);
      this.formularioRestaurante.controls.telefono.setValue(this.restaurante.telefono);
      this.formularioRestaurante.controls.cif.setValue(this.restaurante.cif);
      this.formularioRestaurante.controls.cp.setValue(this.restaurante.cp);
      this.formularioRestaurante.controls.noF.setValue(this.restaurante.nombreFiscal);

    });
  }

  cambioCliente() {
    this.clienteService.datosCliente(this.formularioCliente.controls.clienteId.value).subscribe((data: any) => {
      this.cliente = data.cliente;

      this.formularioCliente.controls.cifC.setValue(this.cliente.cif);
      this.formularioCliente.controls.dir.setValue(this.cliente.direccion);
      this.formularioCliente.controls.cpC.setValue(this.cliente.cp);
      this.formularioCliente.controls.email.setValue(this.cliente.email);

    });
  }


  siguiente(formNumber, dir = 'next') {
    $('.carousel').carousel('pause');
    let valid = false;
    switch (formNumber) {
      case 0:
        debugger
        if (!this.formularioFactura.touched) {
          swal("Error", "Rellena todos los campos antes de pasar al siguiente", "error");
        } else {
          if (!this.formularioFactura.controls.totalC.status) {
            swal("Error", "Introduce un valor superior a 0 en el total concepto", "error");
          } else if (!this.formularioFactura.controls.totalC.status) {
            swal("Error", "Introduce un valor superior a 0 en el total factura", "error");
          } else if (!this.formularioFactura.controls.iva.status) {
            swal("Error", "Introduce un valor superior a 0 en iva", "error");
          }else{
            valid = this.formularioFactura.valid;
          }
          
        }
        break;
      case 1:
        valid = this.formularioRestaurante.valid;
        break;
      case 2:
        valid = this.formularioCliente.valid;
        break;
    }
    this.formsCorrectos[formNumber] = valid;
    if (valid) {
      this.clickNextButton = true;
      if (dir === 'left') {
        dir = 'next';
      } else if (dir === 'right') {
        dir = 'prev';
      }
      if (formNumber === 2) {
        let factura: Factura = {
          fecha: this.formularioFactura.controls.fecha.value,
          concepto: this.formularioFactura.controls.concepto.value,
          iva: this.formularioFactura.controls.iva.value,
          totalConcepto: this.formularioFactura.controls.totalC.value,
          totalFactura: this.formularioFactura.controls.totalF.value,
          idRestaurante: this.formularioRestaurante.controls.restauranteId.value,
          idCliente: this.formularioCliente.controls.clienteId.value
        }

        this.facturaService.crearFactura(factura).subscribe((data: any) => {
          if (data.message === 'Factura creada correctamente!') {
            swal("Exito!", "Factura creada correctamente!", "success");
            $('.carousel').carousel('next')
            this.formularioFactura.reset();
            this.formularioCliente.reset();
            this.formularioRestaurante.reset();
            this.formsCorrectos = [false, false, false];
            this.slideActual = 0;
            this.clickNextButton = false;
          } else {
            swal("Fallo!", "Datos incorrectos", "error");
          }
        });

      } else {
        $('.carousel').carousel(dir)
      }
    }
  }

}
