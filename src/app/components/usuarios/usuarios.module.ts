import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { IndexComponent } from './index/index.component';
import { ActionsComponent } from './actions/actions.component';
import { CreateComponent } from './create/create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    IndexComponent,
    ActionsComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    NgxDatatableModule,
    SharedModule
  ],
  exports: [
    CreateComponent,
    UpdateComponent
  ]
})
export class UsuariosModule { }
