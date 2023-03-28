import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SelectComponent } from './select/select.component';
import { CategoriasComponent } from './categorias.component';
import { IndexComponent } from './index/index.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    SelectComponent,
    CategoriasComponent,
    IndexComponent,
    ActionsComponent
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
