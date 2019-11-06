import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-r-cliente',
  templateUrl: './r-cliente.component.html',
  styleUrls: ['./r-cliente.component.css']
})
export class RClienteComponent implements OnInit {
  public errorMessage = '';
  public errorCliente = false;
  public formularioRegistroCliente: FormGroup;
  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.formularioRegistroCliente = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cif: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      cp: new FormControl('', Validators.required)
    });
  }

  crearCliente() {
    if (!this.formularioRegistroCliente.controls.nombre.errors && !this.formularioRegistroCliente.controls.email.errors &&
      !this.formularioRegistroCliente.controls.cif.errors && !this.formularioRegistroCliente.controls.direccion.errors &&
      !this.formularioRegistroCliente.controls.cp.errors) {
      let cliente: Cliente = {
        nombre: this.formularioRegistroCliente.controls.nombre.value,
        email: this.formularioRegistroCliente.controls.email.value,
        cif: this.formularioRegistroCliente.controls.cif.value,
        direccion: this.formularioRegistroCliente.controls.direccion.value,
        cp: this.formularioRegistroCliente.controls.cp.value
      }
      this.clienteService.altalCliente(cliente).subscribe((data: any) => {
        if (data.message === 'Cliente dado de alta correctamente!') {
          swal("Exito !","Cliente creado con exito","success");
        }else{
          this.errorCliente=true;
          this.errorMessage=data.message;
        }
      },
      (error)=>{
        this.errorCliente=true;
        this.errorMessage=error.message;
      });
    } else {
      this.errorCliente = true;
      this.errorMessage = 'Necesitas todos los campos para dar de alta a un cliente';
    }
  }


}
