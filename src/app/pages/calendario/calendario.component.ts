import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxCalendarComponent, IgxDialogComponent } from "igniteui-angular";
import 'hammerjs';
import { IngresoService } from 'src/app/services/ingreso.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import frozen from "@amcharts/amcharts4/themes/frozen";
import { Restaurante } from 'src/app/interfaces/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacturaService } from 'src/app/services/factura.service';
import { FacturaL } from 'src/app/interfaces/factura';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  public value:Date;
  public boton=true;
  public mostrar=false;
  public mostrarMessage=false;
  public data: any[] = [];
  public title: string = "Total de ventas por fuente";
  public tab = 1;
  public periodo = "total";
  public chart;
  public month = (new Date().getMonth() + 1);
  public listaRes: Restaurante[] = [];
  public year = (new Date()).getFullYear();
  public isCeroTodo = false;
  public formularioRestaurante: FormGroup;
  public listaFac:FacturaL[]=[];
  private restauranteId: number;
  public numFac: number;
  public mes=this.month;
  @ViewChild("calendar", { static: true }) public calendar: IgxCalendarComponent;
  @ViewChild("alert", { static: true }) public dialog: IgxDialogComponent;

  constructor(
    private ingresoService: IngresoService,
    private restauranteService: RestauranteService,
    private facturaService: FacturaService,
  ) { }

  private async initializeChart() {
    this.chart = am4core.create("chartdiv", am4charts.PieChart3D);

    this.chart.hiddenState.properties.opacity = 0;
    this.chart.legend = new am4charts.Legend();
    this.chart.innerRadius = 50;

    let series = this.chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "valor";
    series.dataFields.category = "fuente";
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.stroke = am4core.color("#7c8080");
    series.slices.template.strokeWidth = 1;
    series.slices.template.strokeOpacity = 1;
  }
 
  ngOnInit() {
    
  
   
    this.formularioRestaurante = new FormGroup({
      nombreRestaurante: new FormControl('', Validators.required),

    });
    this.restauranteService.listaRestuarantes().then((data: any) => {
      this.listaRes = data;
    });
    setTimeout(() => {
      this.setSelectedDays();
      this.initializeChart();
      this.graficaTotal(this.periodo);
    }, 1000)

  }

 
 



  setSelectedDays() {

    let list: any = document.getElementsByClassName("k-calendar-view k-calendar-monthview");
    
    for (let item of list) {
      let dias = item.children[2].children[0].children[1].children;
      for (let i of dias) {
        for (let dia of i.children) {
          if (dia.children.length > 0) {
            var reg = /(\<!--.*?\-->)/g;
            let diaCal = dia.children[0].innerHTML.replace(/(\r\n|\n|\r)/gm, "");
            diaCal = diaCal.replace(reg, "");


            if (diaCal == 1) {
              debugger;
              dia.classList.add("k-state-selected")
            }
          }
        }

      }
    }
  }
  numeroMas(tab) {
    //MENSUAL

    console.log(this.month);
    if (tab == 2) {
      this.periodo = "mensual";
      this.month = this.month + 1;
  

      if (this.month > 12) {
        this.month = 1;
      }
      this.graficaMensual(this.periodo, this.month);
    }
    //ANUAL
    else if (tab == 3) {
      this.periodo = "anual";
      this.year = this.year + 1;
      if (this.year > (new Date()).getFullYear()) {
        this.year = (new Date()).getFullYear()
      }
      this.graficaAnual(this.periodo, this.year);
    }

  }

  numeroMenos(tab) {
    if (tab == 2) {
      this.periodo = "mensual";
      this.month = this.month - 1;
      if (this.month <= 0) {
        this.month = 12;
      }
      this.graficaMensual(this.periodo, this.month);
    }
    else if (tab == 3) {
      this.periodo = "anual";
      this.year = this.year - 1;
      this.graficaAnual(this.periodo, this.year);
    }
  }

  cambiaTab(tab) {
    document.getElementById("tab1").classList.remove("active")
    document.getElementById("tab2").classList.remove("active")
    document.getElementById("tab3").classList.remove("active")
    document.getElementById("tab" + tab).classList.add("active")
    this.tab = tab;

    switch (tab) {
      case 1:
        this.title = "Total de ventas por fuente";
        this.periodo = "total";
        this.graficaTotal(this.periodo);
        break;
      case 2:
        this.title = "Mensual de ventas por fuente";
        this.periodo = "mensual";
        this.graficaMensual(this.periodo, this.month);
        break;
      case 3:
        this.title = "Anual de ventas por fuente";
        this.periodo = "anual";
        this.graficaAnual(this.periodo, this.year);
        break;
    }
    return false;
  }

  async graficaTotal(periodo) {
    this.isCeroTodo = false;
    if (this.chart === null) {
      await this.initializeChart();
    }
    this.ingresoService.fuentesIngreso(periodo, 0).subscribe((data: any) => {
      this.data = [];
      let arr = Object.keys(data);
      for (let s of arr) {
        let color = '';
        if (s === 'JustEat') {
          color = "#46cccc";
        }
        else if (s === 'Tarjeta') {
          color = "#7286cc";
        } else if (s === 'Uber') {
          color = "#4c9999";
        }
        else if (s === 'Efectivo') {
          color = "#abbaff";
        }
        else if (s === 'Tenedor') {
          color = "#95B1B0";
        }

        if (data[s] > 0)
          this.data.push({
            fuente: s, valor: data[s], color: color
          })
      }
      this.chart.data = this.data;
    })
  }

  async graficaMensual(periodo, month) {
    if (this.chart === null) {
      await this.initializeChart();
    }
    this.ingresoService.fuentesIngreso(periodo, month).subscribe((data: any) => {
      this.data = [];
      this.isCeroTodo = true;
      let arr = Object.keys(data);
      for (let s of arr) {
        let color = '';
        if (s === 'JustEat') {
          color = "#46cccc";
        }
        else if (s === 'Tarjeta') {
          color = "#7286cc";
        } else if (s === 'Uber') {
          color = "#4c9999";
        }
        else if (s === 'Efectivo') {
          color = "#abbaff";
        }
        else if (s === 'Tenedor') {
          color = "#95B1B0";
        }
        if (data[s] > 0)
          this.data.push({
            fuente: s, valor: data[s], color: color
          })
        if (data[s] > 0) {
          this.isCeroTodo = false;
        }
      }

      this.chart.data = this.data;

      if (this.isCeroTodo) {
        this.chart = null;
        document.getElementById("chartdiv").innerHTML = "";
      
      }
    })

  }
  async graficaAnual(periodo, year) {
    if (this.chart === null) {
      this.initializeChart();
    }
    this.ingresoService.fuentesIngreso(periodo, year).subscribe((data: any) => {
      this.isCeroTodo = true;
      this.data = [];
      let arr = Object.keys(data);
      for (let s of arr) {
        let color = '';
        if (s === 'JustEat') {
          color = "#46cccc";
        }
        else if (s === 'Tarjeta') {
          color = "#7286cc";
        } else if (s === 'Uber') {
          color = "#4c9999";
        }
        else if (s === 'Efectivo') {
          color = "#abbaff";
        }
        else if (s === 'Tenedor') {
          color = "#95B1B0";
        }

        if (data[s] > 0)
          this.data.push({
            fuente: s, valor: data[s], color: color
          })
        if (data[s] > 0) {
          this.isCeroTodo = false;
        }
      }
      this.chart.data = this.data;
      if (this.isCeroTodo) {
        this.chart = null;
        document.getElementById("chartdiv").innerHTML = "";
      }
    })
  }
  cambiarGrafica() {

    if (this.tab == 2) {
      this.periodo = "mensual"
      this.formularioRestaurante.controls.nombreRestaurante.reset();
      this.graficaMensualNombre(this.periodo, this.month, this.restauranteId);

    } else if (this.tab == 3) {
      this.periodo = "anual"
      this.graficaAnualNombre(this.periodo, this.year, this.restauranteId);
    }
  }

  async graficaMensualNombre(periodo, month, id) {

    if (this.chart === null) {
      this.initializeChart();
    }
    this.ingresoService.fuentesIngresoNombre(periodo, month, id).subscribe((data: any) => {
      this.isCeroTodo = true;
      this.data = [];
      let arr = Object.keys(data);
      for (let s of arr) {
        let color = '';
        if (s === 'JustEat') {
          color = "#46cccc";
        }
        else if (s === 'Tarjeta') {
          color = "#7286cc";
        } else if (s === 'Uber') {
          color = "#4c9999";
        }
        else if (s === 'Efectivo') {
          color = "#abbaff";
        }
        else if (s === 'Tenedor') {
          color = "#95B1B0";
        }

        if (data[s] > 0)
          this.data.push({
            fuente: s, valor: data[s], color: color
          })
        if (data[s] > 0) {
          this.isCeroTodo = false;
        }
      }
      this.chart.data = this.data;
      if (this.isCeroTodo) {
        this.chart = null;
        document.getElementById("chartdiv").innerHTML = "";

      }
    })
  }
  graficaAnualNombre(periodo, year, id) {
    if (this.chart === null) {
      this.initializeChart();
    }
    this.ingresoService.fuentesIngresoNombre(periodo, year, id).subscribe((data: any) => {
      this.isCeroTodo = true;
      this.data = [];
      let arr = Object.keys(data);
      for (let s of arr) {
        let color = '';
        if (s === 'JustEat') {
          color = "#46cccc";
        }
        else if (s === 'Tarjeta') {
          color = "#7286cc";
        } else if (s === 'Uber') {
          color = "#4c9999";
        }
        else if (s === 'Efectivo') {
          color = "#abbaff";
        }
        else if (s === 'Tenedor') {
          color = "#95B1B0";
        }

        if (data[s] > 0)
          this.data.push({
            fuente: s, valor: data[s], color: color
          })
        if (data[s] > 0) {
          this.isCeroTodo = false;
        }
      }
      this.chart.data = this.data;
      if (this.isCeroTodo) {
        this.chart = null;
        document.getElementById("chartdiv").innerHTML = "";
      }
    })
  }

  changeRes() {
    this.restauranteId = this.formularioRestaurante.controls.nombreRestaurante.value;
  }
  public onMonthChange(e) {
    this.mostrar=false;
    return  this.mes=e.month;    
 
  }

  FacturaMes(){     
    this.mostrar=true;  
    this.facturaService.listaFacturaMes(this.mes).subscribe((data:any)=>{
      this.listaFac= data.factura;
      if(this.listaFac.length==0){
        this.mostrarMessage=true;
        this.mostrar=false;
      }
    
    });
  }

}
