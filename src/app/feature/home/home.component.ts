import { Component, OnInit } from '@angular/core';
import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { ModalService } from '@cliente/shared/service/modal.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientes:Cliente[];

  public clienteSeleccionado: Cliente;

  constructor(protected clienteService: ClienteService, public modalService:ModalService) { }

  ngOnInit() {
    
    this.clienteService.consultar().subscribe(
      data =>{
        this.clientes = data;
      }
    );
    
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
    alert("oe abri2 " + this.modalService.modal );

    
  }


}
