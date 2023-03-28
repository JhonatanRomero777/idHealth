import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user.layout-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    NgxDatatableModule
  ]
})
export class UserLayoutModule { }
