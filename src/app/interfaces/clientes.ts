import { EmailValidator } from '@angular/forms';

export interface Cliente{
    nombre:string;
    email:string;
    cif:string;
    direccion:string;
    cp:string;
}


export interface ClienteL{
    id:number;
    nombre:string;
    email:string;
    cif:string;
    direccion:string;
    cp:string;
}