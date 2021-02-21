import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/service/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Cliente } from '@cliente/shared/model/cliente';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
    selector: 'app-crear-cliente',
    templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {

    public clienteForm: FormGroup;

    public clientes: Cliente[];
    constructor(protected clienteService: ClienteService, private datePipe: DatePipe, protected router: Router) { }

    ngOnInit(): void {
        this.construirFormularioCliente();
    }

    public crear() {
        let cliente = this.clienteForm.value;
        let fechaCreacion = new Date().toISOString()
        let fecha = this.datePipe.transform(fechaCreacion, "yyyy-MM-dd hh:mm:ss");
        cliente.fechaCreacion = fecha;

        if (this.clienteForm.valid) {
            this.clienteService.guardar(cliente).subscribe(
                () => {
                    swal.fire("Cliente:", `${cliente.nombre} creado con éxito!`, 'success');
                    this.router.navigateByUrl('home');
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

}