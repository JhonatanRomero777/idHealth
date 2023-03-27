import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoriasModule } from '../categorias/categorias.module';


@NgModule({
  declarations: [
    ProductosComponent,
    IndexComponent,
    CreateComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    NgxDatatableModule,
    CategoriasModule
  ]
})
export class ProductosModule { }