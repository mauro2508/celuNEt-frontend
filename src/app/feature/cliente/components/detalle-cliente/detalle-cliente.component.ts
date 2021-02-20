import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Cliente } from "@cliente/shared/model/cliente";
import { ClienteService } from "@cliente/shared/service/cliente.service";
import { ModalService } from "@cliente/shared/service/modal.service";
import { Compra } from "src/app/feature/compra/shared/model/compra";
import { CompraService } from "src/app/feature/compra/shared/service/compra.service";
import swal from 'sweetalert2';

@Component({
    selector: 'app-detalle-cliente',
    templateUrl: './detalle-cliente.component.html'
})
export class DetalleClienteComponent implements OnInit {

    public cliente: Cliente;

    public listaCompras: Compra[];
    constructor(public modalService: ModalService, protected compraService: CompraService, protected activeRoute: ActivatedRoute,
        protected clienteService: ClienteService) {

    }
    ngOnInit(): void {
        let idCliente = this.activeRoute.snapshot.paramMap.get("id");
        this.obtenerCliente(idCliente);

    }

    delete(compraEliminar: Compra) {
        this.compraService.eliminar(compraEliminar).subscribe(
            () =>{
                this.listaCompras = this.listaCompras.filter((compra) => compra !== compraEliminar);
                swal.fire(
                    'Factura Eliminada!',
                    `Factura ${compraEliminar.descripcion} eliminada con éxito.`,
                    'success'
                  )
            }
        );
            
        
    }

    private obtenerCliente(idCliente: any) {
        this.clienteService.consultarPorId(idCliente).subscribe(
            response => {
                this.cliente = response;
                this.consultarCompras();
            })
    }

    private consultarCompras(){
        this.compraService.consultarComprasPorCliente(this.cliente.id).subscribe(
            response => {
                this.listaCompras = response;
            }
        );
    }

}