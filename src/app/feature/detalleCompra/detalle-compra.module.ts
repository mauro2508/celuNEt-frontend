import { NgModule } from "@angular/core";
import { DetalleCompraRoutingComponent } from './detalle-compra-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DetalleCompraService } from './shared/service/detalle-compra.service';


@NgModule({
    declarations: [

    ],
    imports:[
        DetalleCompraRoutingComponent,
        SharedModule

    ],
    providers:[DetalleCompraService]
})

export class DetalleCompraModule{}