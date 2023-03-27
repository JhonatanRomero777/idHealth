import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SelectComponent } from './select/select.component';
import { CategoriasComponent } from './categorias.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    SelectComponent,
    CategoriasComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  exports: [
    SelectComponent
  ]
})
export class CategoriasModule { }
