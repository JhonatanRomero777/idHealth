import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorMsgComponent } from './form-error-msg/form-error-msg.component';


@NgModule({
  declarations: [
    FormErrorMsgComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    FormErrorMsgComponent
  ]
})
export class SharedModule { }
