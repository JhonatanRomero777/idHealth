import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  public successMsg(title: string, text: string = "", timer: number = 0) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: timer == 0 ? true : false,
      timer: timer,
      timerProgressBar: timer == 0 ? false : true,
    });
  }

  public errorMsg(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })
  }
}