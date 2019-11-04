import { Restaurante } from './restaurante';

export interface Ingresos{
    cantidad:number;
    fuente:string;
    fecha:Date;
    restauranteId:number;
}

export interface Ingreso{
    idIngreso:number;
    cantidad:number;
    fuente:string;
    fecha:Date;
    idRestaurante:number;
    nombre_restaurante:string;
}
export interface IngresoL{
    ingreso:Ingreso[];
    restaurantes:Restaurante[];
}