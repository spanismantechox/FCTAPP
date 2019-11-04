import { Proveedor, ProveedorC } from './proveedor';
import { Restaurante } from './restaurante';

export interface Gastos{
    fecha:Date;
    cantidad:number;
    idRestaurante:number;
    idProveedor:number;
}

export interface GastosL{
    proveedores: Proveedor[];
    restaurantes: Restaurante[];
    gastos: GastoItem[];
}
export interface GastoM{
    fecha:Date;
    cantidad:number;
    idProveedor:number;
    idRestaurante:number;
    idGasto:number;
}

export interface GastoItem {
    fecha:Date;
    nombre_proveedor:string;
    nombre_restaurante:string;
    cantidad:number;
    idProveedor:number;
    restauranteId:number;
    idGasto:number;
}