import { Component, OnInit } from '@angular/core';
import { UsuarioL } from 'src/app/interfaces/usuario';
import { RUsuariosService } from 'src/app/services/r-usuarios.service';
import swal from 'sweetalert';
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
        swal("Exito!","Usuario modificado correctamente", "success");
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
