import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { IndexComponent } from './index/index.component';
import { ActionsComponent } from './actions/actions.component';
import { CreateComponent } from './create/create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    UsuariosComponent,
    IndexComponent,
    ActionsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgxDatatableModule
  ]
})
export class UsuariosModule { }
