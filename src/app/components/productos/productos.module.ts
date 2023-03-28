import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { IndexComponent } from './index/index.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoriasModule } from '../categorias/categorias.module';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [
    ProductosComponent,
    IndexComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    NgxDatatableModule,
    CategoriasModule
  ],
  exports: [
    ProductosComponent,
    ActionsComponent
  ]
})
export class ProductosModule { }