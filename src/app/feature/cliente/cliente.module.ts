import { NgModule } from '@angular/core';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ClienteService } from './shared/service/cliente.service';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { DatePipe } from '@angular/common';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { CompraService } from '../compra/shared/service/compra.service';
import { ModalService } from './shared/service/modal.service';



@NgModule({
  declarations: [
    CrearClienteComponent,
    ClienteComponent,
    DetalleClienteComponent
    
  ],
  imports: [
    ClienteRoutingModule,
    SharedModule
  ],
  providers: [ClienteService,
  DatePipe, CompraService, ModalService]
})
export class ClienteModule { }