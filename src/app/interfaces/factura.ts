export interface Factura {
    
    fecha:Date;
    concepto:string;
    iva:number;
    totalConcepto:number;
    totalFactura:number;
    idRestaurante:number;
    idCliente:number;
}


export interface FacturaL{
    numeroFactura:number;
    fecha:Date;
    concepto:string;
    nombreRestaurante:string;
    nombreCliente:string;
    totalFactura:number;
}
