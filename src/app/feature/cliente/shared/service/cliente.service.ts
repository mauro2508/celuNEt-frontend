import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';


@Injectable()
export class ClienteService {
  
  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}/clientes`, this.http.optsName('Consultar clientes'));
  }

  public guardar(cliente: Cliente) {
    return this.http.doPost<Cliente, number>(`${environment.endpoint}/clientes`, cliente,
                                                this.http.optsName('Crear cliente'));
  }

  public editar(cliente: Cliente) {
    return this.http.doPut<Cliente, boolean>(`${environment.endpoint}/clientes/${cliente.id}`, cliente,
                                                this.http.optsName('crear/actualizar lugar turistico'));
  }

  public eliminar(cliente: Cliente) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/clientes/${cliente.id}`,
                                                 this.http.optsName('eliminar productos'));
  }

  public consultarPorId(idCliente){
    return this.http.doGet<Cliente>(`${environment.endpoint}/clientes/${idCliente}`,
                                                  this.http.optsName("obtener cliente por id"));
  }
  
}