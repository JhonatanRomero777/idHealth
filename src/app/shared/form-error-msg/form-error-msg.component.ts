import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.css']
})
export class FormErrorMsgComponent {
  @Input() myFormControl: any;
}