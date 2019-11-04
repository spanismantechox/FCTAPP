import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  buscarTexto: string = "";
  @Input() mostrarBuscador: boolean = false;
  @Output() buscarEvent = new EventEmitter<string>();
  constructor(
    private router : Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  buscar() {
    this.buscarEvent.emit(this.buscarTexto); 
  }

}
