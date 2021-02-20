import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "@cliente/shared/model/cliente";
import { ClienteService } from "@cliente/shared/service/cliente.service";
import { Producto } from "@producto/shared/model/producto";
import { ProductoService } from "@producto/shared/service/producto.service";
import { Observable } from "rxjs";
import { DetalleCompra } from "src/app/feature/detalleCompra/shared/model/detalle-compra";
import { DetalleCompraService } from "src/app/feature/detalleCompra/shared/service/detalle-compra.service";
import { Compra } from "../../shared/model/compra";
import { CompraService } from "../../shared/service/compra.service";
import swal from 'sweetalert2';


@Component({
    selector: 'app-crear-compra',
    templateUrl: './crear-compra.component.html'
})
export class CrearCompraComponent implements OnInit {

    public cliente: Cliente;

    compraForm: FormGroup;

    public $listaProductos: Observable<Producto[]>;

    public valorTotalCompra: number;

    public listaDetalles: DetalleCompra[] = [];

    productoControl = new FormControl('', Validators.required);

    constructor(protected clienteService: ClienteService, protected compraService: CompraService,
        protected activatedRoute: ActivatedRoute, protected productoService: ProductoService, protected datePipe: DatePipe,
        protected detalleCompraService: DetalleCompraService, protected router: Router) {

    }
    ngOnInit(): void {

        this.construirFormularioCompra();
        let clienteId = this.activatedRoute.snapshot.paramMap.get('id');
        this.clienteService.consultarPorId(clienteId).subscribe(
            response => {
                this.cliente = response;
            });

        this.$listaProductos = this.productoService.consultar();

    }


    private construirFormularioCompra() {
        this.compraForm = new FormGroup({
            descripcion: new FormControl('', [Validators.required])
        });
    }

    seleccionarProducto(event: any) {
        let producto = event.value as Producto;

        if (this.existeProducto(producto.id)) {
            this.incrementaCantidad(producto.id);
        } else {
            let detalleCompra: DetalleCompra = new DetalleCompra();
            detalleCompra.idProducto = producto.id;
            detalleCompra.nombreProducto = producto.nombre;
            detalleCompra.precio = producto.precio;
            detalleCompra.cantidad = 1;
            this.listaDetalles.push(detalleCompra);
        }


    }

    actualizarCantidad(id: number, event: any) {
        let cantidad: number = event.target.value as number;

        if (cantidad == 0) {
            return this.eliminarDetalle(id);
        }
        this.listaDetalles = this.listaDetalles.map((item) => {
            if (id === item.idProducto) {
                item.cantidad = cantidad;
            }
            return item;
        });
    }

    public calcularValorDetalle(cantidad: number, precio: number): number {
        return cantidad * precio;
    }

    calcularValorTotalCompra(): number {
        this.valorTotalCompra = 0;
        this.listaDetalles.forEach(detalle => {
            this.valorTotalCompra += this.calcularValorDetalle(detalle.cantidad, detalle.precio);
        });

        return this.valorTotalCompra;

    }

    existeProducto(id: number): boolean {
        let existe = false;
        this.listaDetalles.forEach((detalle) => {
            if (id === detalle.idProducto) {
                existe = true;
            }
        });
        return existe;
    }


    incrementaCantidad(id: number): void {
        this.listaDetalles = this.listaDetalles.map((detalle) => {
            if (id === detalle.idProducto) {
                ++detalle.cantidad;
            }
            return detalle;
        });
    }

    eliminarDetalle(id: number): void {
        this.listaDetalles = this.listaDetalles.filter((detalle) => id !== detalle.idProducto);
    }
    crear() {

        let compra: Compra = new Compra();
        compra.idCliente = this.cliente.id;
        let descripcion = this.compraForm.value;
        compra.descripcion = descripcion.descripcion;
        compra.fechaCompra = this.datePipe.transform(new Date(), "yyyy-MM-dd");
        compra.identificadorCompra = "";
        compra.valorTotalCompra = this.valorTotalCompra;

        
        if(this.compraForm.valid && this.listaDetalles.length > 0){
            this.compraService.guardar(compra).subscribe(
                response => {
                    let idCompra = response.valor;
                    this.listaDetalles.forEach((detalle) => detalle.idCompra = idCompra);
                    this.listaDetalles.forEach(detalle => this.detalleCompraService.guardar(detalle).subscribe());
                    swal.fire("Compra nueva", `Factura ${compra.descripcion} creada con éxito!`, 'success');
                    this.router.navigateByUrl('home');
                }
            );
        }
        
    }

}