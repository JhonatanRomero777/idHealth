import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.css']
})
export class FormErrorMsgComponent {
  @Input() myFormControl: any;
  @Input() minLengthNumber: number;
}