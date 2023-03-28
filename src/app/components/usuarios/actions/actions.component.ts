import { Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { SearchService } from 'src/app/services/search.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnDestroy  {

  @Output() usuarioOutput = new EventEmitter<Usuario[]>();
  @Output() resetOutput = new EventEmitter<boolean>();

  @ViewChild("userCorreo") InputCorreo: any;
  
  loadingSearch: boolean = false;
  cancelar: boolean = false;

  public $user: Usuario;

  private $userSearchSubscription: Subscription;
  private $userDeleteSubscription: Subscription;

  constructor(private sweetAlertService: SweetAlertService, private searchService: SearchService,
              private userService: UserService){}

  ngOnDestroy() { if(this.$userSearchSubscription) this.$userSearchSubscription.unsubscribe();
  }

  search($name: string){
    if($name){
      this.$userSearchSubscription = this.searchService.usuarios($name).subscribe(
        (result)=>{          
          if(result.results.length > 0){
            this.usuarioOutput.emit(result.results);
            this.cancelar = true;
          }
          else this.sweetAlertService.errorMsg("Ningún Resultado");

          this.loadingSearch = false;
      });
    }
    else{
      this.loadingSearch = false;
      this.sweetAlertService.errorMsg("Ingrese Correo");
    }
  }

  reset(){
    this.InputCorreo.nativeElement.value = "";
    this.resetOutput.emit(true);
    this.cancelar = false;
    this.$user = null;
  }

  delete($user: Usuario){

    let $userDeleteSubscription: Subscription;
    let userService = this.userService;
    let me = this;
  
    this.sweetAlertService.deleteConfirm("Usuario = " + $user.nombre).then(
      function(result) {
  
        if (result.value) {
          $userDeleteSubscription = userService.delete($user).subscribe(
            (result)=>{          
              me.reset();
              me.sweetAlertService
              .successMsg("Eliminación Exitosa", "Usuario eliminado correctamente");
            },
            (error) => {
              me.sweetAlertService.errorMsg(error.error.msg);
            }
          );
        }  
      });
  }
}