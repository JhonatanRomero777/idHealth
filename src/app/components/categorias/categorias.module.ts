import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SelectComponent } from './select/select.component';
import { CategoriasComponent } from './categorias.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    SelectComponent,
    CategoriasComponent,
    IndexComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    NgxDatatableModule
  ],
  exports: [
    SelectComponent
  ]
})
export class CategoriasModule { }
