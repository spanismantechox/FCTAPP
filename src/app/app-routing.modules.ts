import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { HomeComponent } from './pages/home/home.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { RClienteComponent } from './pages/r-cliente/r-cliente.component';
import { RProveedorComponent } from './pages/r-proveedor/r-proveedor.component';
import { RUsuarioComponent } from './pages/r-usuario/r-usuario.component';
import { RRestauranteComponent } from './pages/r-restaurante/r-restaurante.component';
import { LFacturaComponent } from './pages/l-factura/l-factura.component';
import { LIngresoComponent } from './pages/l-ingreso/l-ingreso.component';
import { GastoComponent } from './pages/gasto/gasto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { AuthguardService } from './services/authguard.service';
import { CrearFacturaUserComponent } from './pages/crear-factura-user/crear-factura-user.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';






const APP_ROUTES: Routes =[
    {path:'', component:LoginComponent},
    {path:'home', component:HomeComponent, canActivate: [AuthguardService]},
    {path:'cFactura', component:FacturaComponent, canActivate: [AuthguardService]},
    {path:'ingreso', component:IngresoComponent, canActivate: [AuthguardService]},
    {path:'rCliente', component:RClienteComponent, canActivate: [AuthguardService]},
    {path:'rProveedor', component:RProveedorComponent, canActivate: [AuthguardService]},
    {path:'rUsuario', component:RUsuarioComponent, canActivate: [AuthguardService]},
    {path:'lFactura', component:LFacturaComponent, canActivate: [AuthguardService]},
    {path:'lIngreso', component:LIngresoComponent, canActivate: [AuthguardService]},
    {path:'gasto', component:GastoComponent, canActivate: [AuthguardService]},
    {path:'restaurante',component:RestauranteComponent, canActivate: [AuthguardService]},    
    {path:'usuario', component:UsuarioComponent, canActivate: [AuthguardService]},
    {path:'proveedor', component:ProveedorComponent, canActivate: [AuthguardService]},
    {path:'cliente', component:ClienteComponent, canActivate: [AuthguardService]},
    {path:'rRestaurante',component:RRestauranteComponent, canActivate: [AuthguardService]},
    {path: 'crearFacturaUser',component:CrearFacturaUserComponent,canActivate:[AuthguardService]},
    {path: 'graficos',component:CalendarioComponent,canActivate:[AuthguardService]},
    {path:'**',pathMatch:'full', redirectTo:''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});