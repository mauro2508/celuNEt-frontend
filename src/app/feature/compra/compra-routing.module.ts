import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraComponent } from './components/compra/compra.component';
import { CrearCompraComponent } from './components/crear-compra/crear-compra.component';
import { DetalleCompraComponent } from './components/detalle-compra/detalle-compra.component';




const routes: Routes = [
  {
    path: '',
    component: CompraComponent,
    children: [
      {
        path: ':id/crear',
        component: CrearCompraComponent
      },

      {
        path: ':identificadorCompra/detalle',
        component: DetalleCompraComponent
      }

      /*
      {
        path: 'listar',
        component: ListarProductoComponent
      },
      {
        path: 'borrar',
        component: BorrarProductoComponent
      }
      */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }