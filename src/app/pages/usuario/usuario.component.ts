import { Component, OnInit } from '@angular/core';
import { UsuarioL } from 'src/app/interfaces/usuario';
import { RUsuariosService } from 'src/app/services/r-usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public errorMessage='';
  public errorUsuario=false;
  public listaUser: UsuarioL[]= [];

  constructor(
    private usuarioService: RUsuariosService,
  ) { }

  ngOnInit() {
    this.usuarioService.listaUsuarios().subscribe((data:any)=>{
      this.listaUser=data;
    });
  }

  modificar(e){
    this.usuarioService.modificarUsuarios(e).subscribe((data:any)=> {
      if(data.message==='Usuario modificado correctamente!'){
        alert("Usuario modificado correctamente!");
      }else{
        this.errorUsuario=true;
        this.errorMessage=data.message;
      }
    },(error)=>{
      this.errorUsuario=true;
      this.errorMessage=error.message;
    })
  }

}
