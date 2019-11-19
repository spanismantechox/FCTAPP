import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioL } from 'src/app/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  @Input() usuario: UsuarioL;
  @Output() guardar = new EventEmitter<UsuarioL>();
  public formularioEditarUsuario: FormGroup;
  public editando=false;
  constructor() { }

  ngOnInit() {
    this.formularioEditarUsuario= new FormGroup({
      nombre: new FormControl({value: this.usuario.nombre, disabled:true},Validators.required),
      rol: new FormControl({value: this.usuario.rol, disabled:true},Validators.required)
    });
  }
  habilitar(){
    this.editando=true;
    this.formularioEditarUsuario.controls.nombre.disable();
    this.formularioEditarUsuario.controls.rol.enable();
  }

  guardarUser(){
    this.editando=false;

    this.usuario.nombre= this.formularioEditarUsuario.controls.nombre.value;
    this.usuario.rol= this.formularioEditarUsuario.controls.rol.value;

    this.guardar.emit(this.usuario);

    this.formularioEditarUsuario.controls.nombre.disable();
    this.formularioEditarUsuario.controls.rol.disable();

  }

}
