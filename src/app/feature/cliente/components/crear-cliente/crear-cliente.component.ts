import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/service/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Cliente } from '@cliente/shared/model/cliente';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-crear-cliente',
    templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {

    public clienteForm: FormGroup;

    public clientes: Cliente[];

    public idCliente;

    public textoBoton: string;

    public clienteEditar: Cliente;

    constructor(protected clienteService: ClienteService, private datePipe: DatePipe, protected router: Router,
        private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.construirFormularioCliente();

        this.idCliente = this.activeRoute.snapshot.paramMap.get('id');
        if (this.idCliente) {
            this.cargarClienteEditar(this.idCliente);
            this.textoBoton = 'Actualizar';
        }else{
            this.textoBoton = 'Crear';
        }
    }

    public crearActualizar() {

        if (this.clienteForm.valid) {

            let cliente = this.clienteForm.value;
            if (this.idCliente) {
                cliente.id = this.clienteEditar.id
                cliente.fechaCreacion = this.clienteEditar.fechaCreacion;
                this.clienteService.editar(cliente).subscribe(
                    () => {
                        swal.fire("Cliente:", `${cliente.nombre} actualizado con éxito!`, 'success');
                        this.router.navigateByUrl('home');
                    }, error =>{
                        swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.error.mensaje
                        });
                    }
                );
                return;
            }

            //let fechaCreacion = new Date().toISOString()
            //let fecha = this.datePipe.transform(fechaCreacion, "yyyy-MM-dd hh:mm:ss");
            cliente.fechaCreacion = this.datePipe.transform(new Date().toISOString(), "yyyy-MM-dd hh:mm:ss");
            this.clienteService.guardar(cliente).subscribe(
                () => {
                    swal.fire("Cliente:", `${cliente.nombre} creado con éxito!`, 'success');
                    this.router.navigateByUrl('home');
                }, error =>{
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error.mensaje
                    });
                }
            );
        }
    }

    private construirFormularioCliente() {
        this.clienteForm = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            apellido: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            fechaNacimiento: new FormControl('', [Validators.required])
        });
    }

    private cargarClienteEditar(id) {
        this.clienteService.consultarPorId(id).subscribe(
            response => {
                this.clienteEditar = response;
                this.clienteForm.controls['nombre'].setValue(this.clienteEditar.nombre);
                this.clienteForm.controls['apellido'].setValue(this.clienteEditar.apellido);
                this.clienteForm.controls['email'].setValue(this.clienteEditar.email);
                this.clienteForm.controls['fechaNacimiento'].setValue(this.clienteEditar.fechaNacimiento);
            }
        );

    }

}