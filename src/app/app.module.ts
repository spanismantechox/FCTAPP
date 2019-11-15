
import { NgModule, LOCALE_ID } from '@angular/core';

import {APP_ROUTING} from './app-routing.modules';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { OkMessageComponent } from './components/ok-message/ok-message.component';
import { LoginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { 
	IgxCalendarModule,
	IgxDialogModule
 } from "igniteui-angular";
 import {CalendarModule} from 'primeng/calendar';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { ChartsModule } from '@progress/kendo-angular-charts';
import '@progress/kendo-angular-intl/locales/es/all';
import { RUsuariosService } from './services/r-usuarios.service';
import { FacturaComponent } from './pages/factura/factura.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';

import { RClienteComponent } from './pages/r-cliente/r-cliente.component';
import { RProveedorComponent } from './pages/r-proveedor/r-proveedor.component';
import { RUsuarioComponent } from './pages/r-usuario/r-usuario.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GastoComponent } from './pages/gasto/gasto.component';
import { LIngresoComponent } from './pages/l-ingreso/l-ingreso.component';
import { LFacturaComponent } from './pages/l-factura/l-factura.component'
import { IngresoService } from './services/ingreso.service';
import { GastoService } from './services/gasto.service';
import { RestauranteService } from './services/restaurante.service';
import { ProveedorService } from './services/proveedor.service';
import { ClienteService } from './services/cliente.service';
import { RRestauranteComponent } from './pages/r-restaurante/r-restaurante.component';
import { EditarRestauranteComponent } from './components/editar-restaurante/editar-restaurante.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { EditarProveedoresComponent } from './components/editar-proveedores/editar-proveedores.component';
import { EditarUsuariosComponent } from './components/editar-usuarios/editar-usuarios.component';
import { EditarGastosComponent } from './components/editar-gastos/editar-gastos.component';
import { EditarIngresosComponent } from './components/editar-ingresos/editar-ingresos.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';

import { CrearFacturaUserComponent } from './pages/crear-factura-user/crear-factura-user.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
registerLocaleData(localeEs); 





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    ErrorComponent,
    OkMessageComponent,
    HomeComponent,
    CalendarioComponent,
    FacturaComponent,
    IngresoComponent,
    RClienteComponent,
    RProveedorComponent,
    RUsuarioComponent,
    RestauranteComponent,
    ClienteComponent,
    ProveedorComponent,
    UsuarioComponent,
    GastoComponent,
    LIngresoComponent,
    LFacturaComponent,
    RRestauranteComponent,
    EditarRestauranteComponent,
    EditarClienteComponent,
    EditarProveedoresComponent,
    EditarUsuariosComponent,
    EditarGastosComponent,
    EditarIngresosComponent,
    FooterComponent,
   
    CrearFacturaUserComponent,
   
    MenuUserComponent,

    
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    IgxCalendarModule,
    IgxDialogModule,
    CalendarModule,
    DateInputsModule,
    ChartsModule
  ],
  providers: [
    LoginService,
    RUsuariosService,
    IngresoService,
    GastoService,
    RestauranteService,
    ProveedorService,
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
