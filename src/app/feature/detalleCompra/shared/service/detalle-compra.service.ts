import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { DetalleCompra } from "../model/detalle-compra";

@Injectable()
export class DetalleCompraService{

    constructor(protected http:HttpService){}
    
    public consultar(){
        return this.http.doGet<DetalleCompra[]>(`${environment.endpoint}/detallesCompra`,this.http.optsName('Consultar detalles compras'));
    }

    public guardar(detalleCompra: DetalleCompra) {
        return this.http.doPost<DetalleCompra, boolean>(`${environment.endpoint}/detallesCompra`, detalleCompra,
                                                    this.http.optsName('Crear detalle compra'));
    }
    
    public editar(detalleCompra: DetalleCompra) {
        return this.http.doPut<DetalleCompra, boolean>(`${environment.endpoint}/detallesCompra/${detalleCompra.id}`, detalleCompra,
                                                    this.http.optsName('actualizar compra'));
    }
    
    public eliminar(detalleCompra: DetalleCompra) {
        return this.http.doDelete<boolean>(`${environment.endpoint}/detallesCompra/${detalleCompra.id}`,
                                                     this.http.optsName('eliminar detalle compra'));
    }

    public consultarDetallesPorCompra(idCompra){
        return this.http.doGet<DetalleCompra[]>(`${environment.endpoint}/detallesCompra/${idCompra}`,
                                                    this.http.optsName('listar detalles por compra'));

    }

}