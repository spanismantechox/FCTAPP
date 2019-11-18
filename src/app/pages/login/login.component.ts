import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  public formularioLogin: FormGroup;  
  public errorLogin =false;
  public errorMessage='';
  private recordar = false;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    let usuario='';
    let contrasena='';
    if(localStorage.getItem("nombre")){
      usuario=localStorage.getItem("nombre");
      contrasena=localStorage.getItem("contrasena");
      this.recordar=true;
    }
    this.formularioLogin = new FormGroup({
      nombre: new FormControl(usuario,Validators.required),
      password: new FormControl(contrasena,Validators.required),
      recordar: new FormControl(this.recordar)
    });
  }

  onSubmit(){
    if(!this.formularioLogin.controls.nombre.errors && !this.formularioLogin.controls.password.errors)
    {
      let login: Login;
      if(this.recordar) {
        login ={
          nombre: this.formularioLogin.controls.nombre.value,
          contrasena:this.formularioLogin.controls.password.value
        }
      } else {
        login ={
          nombre: this.formularioLogin.controls.nombre.value,
          contrasena:CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(this.formularioLogin.controls.password.value))
        }
      }
      
      this.loginService.login(login).subscribe((data:any)=>{
    
        if(data.message==='Admin'){
          
          if(this.formularioLogin.controls.recordar.value){
            localStorage.setItem("nombre",this.formularioLogin.controls.nombre.value);
            if(this.recordar) {
              localStorage.setItem("contrasena",this.formularioLogin.controls.password.value);
            } else {
              localStorage.setItem("contrasena",CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(this.formularioLogin.controls.password.value)));
            }
          }else{
            localStorage.clear();
          }
          let usuario : Usuario ={
            nombre: this.formularioLogin.controls.nombre.value
          }
          this.loginService.usuario=usuario;
          localStorage.setItem("logged",'true');
          this.errorLogin=false;
          this.router.navigate(['home']);
        }else if(data.message==='User'){
      
          if(this.formularioLogin.controls.recordar.value){
            localStorage.setItem("nombre",this.formularioLogin.controls.nombre.value);
            if(this.recordar) {
              localStorage.setItem("contrasena",this.formularioLogin.controls.password.value);
            } else {
              localStorage.setItem("contrasena",CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(this.formularioLogin.controls.password.value)));
            }
          }else{
            localStorage.clear();
          }
          let usuario : Usuario ={
            nombre: this.formularioLogin.controls.nombre.value
          }
          this.loginService.usuario=usuario;
          localStorage.setItem("logged",'true');
          this.errorLogin=false;
          this.router.navigate(['crearFacturaUser']);
        }
        else{
          this.errorLogin=true;
          this.errorMessage=data.message;
          localStorage.clear();
        }

        localStorage.setItem("userType",data.message);
      }, (error)=>{
        this.errorLogin=true;
        this.errorMessage=error.message;
        localStorage.clear();
      });
    }else{
      this.errorLogin=true;
      this.errorMessage='El usuario y la contraseña son obligatorios';
      localStorage.clear();
    }
  }

}
