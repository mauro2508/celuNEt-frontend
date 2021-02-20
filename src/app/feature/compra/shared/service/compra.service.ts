import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from 'src/environments/environment';
import { Compra } from '../model/compra';

@Injectable()
export class CompraService{

    constructor(protected http:HttpService){}
    
    public consultar(){
        return this.http.doGet<Compra[]>(`${environment.endpoint}/compras`,this.http.optsName('Consultar compras'));
    }

    public guardar(compra: Compra) {
        return this.http.doPost<Compra, any>(`${environment.endpoint}/compras`, compra,
                                                    this.http.optsName('Crear compra'));
    }
    
    public editar(compra: Compra) {
        return this.http.doPut<Compra, boolean>(`${environment.endpoint}/compras/${compra.id}`, compra,
                                                    this.http.optsName('actualizar compra'));
    }
    
    public eliminar(compra: Compra) {
        return this.http.doDelete<boolean>(`${environment.endpoint}/compras/${compra.id}`,
                                                     this.http.optsName('eliminar compra'));
    }

    public consultarComprasPorCliente(idCliente:number){
        return this.http.doGet<Compra[]>(`${environment.endpoint}/compras/${idCliente}`,
                                                    this.http.optsName('listar compras por cliente'));

    }

    public consultarCompraPorIdentificador(identificadorCompra:string){
        return this.http.doGet<Compra>(`${environment.endpoint}/compras/detalle/${identificadorCompra}`,
                                                    this.http.optsName('Obtiene una compra por el identificador de compra'));
    }

}