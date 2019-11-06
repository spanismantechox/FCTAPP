import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteL } from 'src/app/interfaces/clientes';
import swal from 'sweetalert';
@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  public editando=false;
  public formularioListaCliente: FormGroup;
  @Input() cliente: ClienteL;
  @Output() guardar = new EventEmitter<ClienteL>();
  constructor(
    
  ) { }

  ngOnInit() {
    this.formularioListaCliente= new FormGroup({
      nombre: new FormControl({value: this.cliente.nombre, disabled: true },Validators.required),
      email: new FormControl({value: this.cliente.email, disabled: true}, [Validators.required, Validators.email]),
      cif: new FormControl({value: this.cliente.cif, disabled:true},Validators.required),
      direccion: new FormControl({value:this.cliente.direccion, disabled:true},Validators.required),
      cp: new FormControl({value:this.cliente.cp, disabled:true},Validators.required)
    })
  }

  habilitar(){
    this.formularioListaCliente.controls.nombre.enable();
    this.formularioListaCliente.controls.email.enable();
    this.formularioListaCliente.controls.cif.enable();
    this.formularioListaCliente.controls.direccion.enable();
    this.formularioListaCliente.controls.cp.enable();
    this.editando=true;
  }

  guardarCli(){
    this.editando= false;
    debugger;
    if(!this.formularioListaCliente.controls.email.valid) {
      swal("Fallo!","error email mal","success")
    } else {
      this.cliente.nombre = this.formularioListaCliente.controls.nombre.value;
      this.cliente.email= this.formularioListaCliente.controls.email.value;
      this.cliente.cif= this.formularioListaCliente.controls.cif.value;
      this.cliente.direccion=this.formularioListaCliente.controls.direccion.value;
      this.cliente.cp=this.formularioListaCliente.controls.cp.value;
  
      this.guardar.emit(this.cliente);
  
      this.formularioListaCliente.controls.nombre.disable();
      this.formularioListaCliente.controls.email.disable();
      this.formularioListaCliente.controls.cif.disable();
      this.formularioListaCliente.controls.direccion.disable();
      this.formularioListaCliente.controls.cp.disable();
  
    }
   



  }

}
