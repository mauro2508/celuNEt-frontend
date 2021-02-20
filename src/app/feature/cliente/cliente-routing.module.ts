import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';

import { ClienteComponent } from './components/cliente/cliente.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: 'crear',
        component: CrearClienteComponent
      },
      
      {
        path: ':id/detalle',
        component: DetalleClienteComponent
      }
      /*
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
export class ClienteRoutingModule { }