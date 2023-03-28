import { Component } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private sweetAlertService: SweetAlertService, private userService: UserService){}

  // create($userCreate: UsuarioCreate){
  //   if($userCreate){
  //     this.userService.create($userCreate).subscribe(
  //       (result)=>{          
  //         this.reset();
  //         this.loadingCreate = false;
  //         this.sweetAlertService.successMsg("Creación Exitosa", "Usuario creado correctamente");
  //       },
  //       (error) => {
  //         this.sweetAlertService.errorMsg(error.error.msg);
  //         this.loadingCreate = false;
  //       });
  //   }
  //   else{
  //     this.loadingCreate = false;
  //     this.sweetAlertService.errorMsg("Formulario Incompleto");
  //   }
  // }

    // edit(data: UsuarioCreate, userId: string){
  //   this.$category = $category;
  //   this.InputCorreo.nativeElement.value = this.$category.nombre;
  // }

  // updateUser(){
  //   if(this.InputCorreo.nativeElement.value){

  //     if(this.InputCorreo.nativeElement.value === this.$user.nombre){
  //       this.loadingUpdate = false;
  //       this.reset();
  //     }
  //     else {

  //       this.$user.nombre = this.InputCorreo.nativeElement.value;

  //       this.userService.update(this.$user, "").subscribe(
  //         (result)=>{          
  //           this.reset();
  //           this.loadingUpdate = false;
  //           this.sweetAlertService
  //           .successMsg("Actualización Exitosa", "Categoría actualizada correctamente");
  //         },
  //         (error) => {
  //           this.sweetAlertService.errorMsg(error.error.msg);
  //           this.loadingUpdate = false;
  //         });
  //     }
  //   }
  //   else{
  //     this.loadingUpdate = false;
  //     this.sweetAlertService.errorMsg("Ingrese Nombre");
  //   }
  // }
}