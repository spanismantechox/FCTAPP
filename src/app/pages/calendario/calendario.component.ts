import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxCalendarComponent, IgxDialogComponent } from "igniteui-angular";
import 'hammerjs';
import { IngresoService } from 'src/app/services/ingreso.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public data: any[] = [];

  public labelContent(e: any): string {
    return e.category;
  }
  public legendLabels(data): string {
    return data.text + " " + data.value + " €";
  }
  @ViewChild("calendar", { static: true }) public calendar: IgxCalendarComponent;
  @ViewChild("alert", { static: true }) public dialog: IgxDialogComponent;
  
  constructor(
    private ingresoService: IngresoService,
    private facturaService: FacturaService,
    
  ) { }
    
  ngOnInit() {

    setTimeout(()=> {
      this.setSelectedDays();
    }, 1000)
    
    this.ingresoService.fuentesIngreso().subscribe((data: any) => {
      let arr = Object.keys(data);
      for(let s of arr) {
        this.data.push({
          fuente: s, valor: data[s]
        })
      }  
    

    
    
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 1; 
    chart.legend = new am4charts.Legend();
    
    chart.data = this.data;
    
    chart.innerRadius = 50;
    
    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "valor";
    series.dataFields.category = "fuente";
        
    //am4core.useTheme(am4themes_animated)
     
    })
  }

  onActiveDateChange(e) {
    console.log(e)
  }
  
  onChange(e) {
  }

  setSelectedDays(){
    let list: any = document.getElementsByClassName("k-calendar-view k-calendar-monthview");
    for (let item of list) {
      let dias = item.children[2].children[0].children[1].children;
      for (let i of dias) {
        for (let dia of i.children) {
          if (dia.children.length > 0) {
            var reg = /(\<!--.*?\-->)/g;
            let diaCal = dia.children[0].innerHTML.replace(/(\r\n|\n|\r)/gm, "");
            diaCal = diaCal.replace(reg, "");
            debugger;
            let fac= this.facturaService.listaFacturaMesAnho(diaCal);
            if(diaCal == fac) {
              dia.classList.add("k-state-selected")
            }
          }
        }

      }
    }
  }
  
}
