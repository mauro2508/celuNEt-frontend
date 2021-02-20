import { NgModule } from '@angular/core';

import { CompraRoutingModule } from './compra-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CompraService } from './shared/service/compra.service';
import { DatePipe } from '@angular/common';
import { CrearCompraComponent } from './components/crear-compra/crear-compra.component';
import { CompraComponent } from './components/compra/compra.component';
import { MatSelectModule } from '@angular/material/select';
import { DetalleCompraService } from '../detalleCompra/shared/service/detalle-compra.service';
import { DetalleCompraComponent } from '../compra/components/detalle-compra/detalle-compra.component';



@NgModule({
  declarations: [
    CompraComponent,
    CrearCompraComponent,
    DetalleCompraComponent
    
  ],
  imports: [
    CompraRoutingModule,
    SharedModule,
    MatSelectModule
  ],
  providers: [CompraService,
  DatePipe, DetalleCompraService]
})
export class CompraModule { }