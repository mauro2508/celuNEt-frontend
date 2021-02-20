import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Cliente } from "@cliente/shared/model/cliente";
import { ClienteService } from "@cliente/shared/service/cliente.service";
import { ProductoService } from "@producto/shared/service/producto.service";
import { DetalleCompra } from "src/app/feature/detalleCompra/shared/model/detalle-compra";
import { DetalleCompraService } from "src/app/feature/detalleCompra/shared/service/detalle-compra.service";
import { Compra } from "../../shared/model/compra";
import { CompraService } from "../../shared/service/compra.service";
import swal from 'sweetalert2';
import { Producto } from "@producto/shared/model/producto";
import { forkJoin } from "rxjs";

@Component({
    selector: 'app-detalle-compra',
    templateUrl: './detalle-compra.component.html'
})
export class DetalleCompraComponent implements OnInit{
    
    public cliente:Cliente;
    public compra:Compra;
    public listaDetalles: DetalleCompra[];

    constructor(protected clienteService: ClienteService, protected compraService: CompraService,
        protected activatedRoute: ActivatedRoute, protected productoService: ProductoService, protected datePipe: DatePipe,
        protected detalleCompraService: DetalleCompraService){

    }
    ngOnInit(): void {
        let compraIdentificador = this.activatedRoute.snapshot.paramMap.get('identificadorCompra');

        this.compraService.consultarCompraPorIdentificador(compraIdentificador).subscribe(
            response =>{
                this.compra = response;
                this.consultarCliente(this.compra.idCliente);
                this.consultarDetallesCompra(this.compra.id);
            },
            error =>{
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.error.mensaje
                });
            }
        );

    }

    consultarCliente(idCliente:number){
        this.clienteService.consultarPorId(idCliente).subscribe(
            response => {
                this.cliente = response;
            },
            error =>{
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.error.mensaje
                });
            }
        );
    }

    consultarDetallesCompra(idCompra:number){
        this.detalleCompraService.consultarDetallesPorCompra(idCompra).subscribe(
            response =>{
                this.listaDetalles = response;


                let arrayOfIdProductos = [];
                for(var x=0; x < this.listaDetalles.length;x++){
                    var idProducto = this.listaDetalles[x].idProducto;
                    arrayOfIdProductos.push(this.productoService.consultarPorId(idProducto));
                }
                    forkJoin(arrayOfIdProductos).subscribe(
                        response =>{
                            let productos: Producto[] = response as Producto[];
                            for(var i=0; i < this.listaDetalles.length;i++){
                                let producto = productos.find(p => p.id == this.listaDetalles[i].idProducto);
                                this.listaDetalles[i].nombreProducto = producto.nombre;
                                this.listaDetalles[i].precio = producto.precio;
                            }


                        }
                    );
                  
                
            },
            error =>{
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.error.mensaje
                });
            }
        );
    }

    public calcularValorDetalle(cantidad: number, precio: number): number {
        return cantidad * precio;
    }

    public consultarProducto(idProducto: number):Producto{
        let producto= new Producto();
        this.productoService.consultarPorId(idProducto).subscribe(
            response =>{
                producto = response;
            }
        );

        return producto;
    }

}