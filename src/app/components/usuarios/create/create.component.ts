import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioCreate } from 'src/app/models/usuario.create';
import { RouteService } from 'src/app/services/route.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  @Output() loginOutput = new EventEmitter<boolean>();
  
  @Input() $role: string;
  $roles: string[] = environment.roles;

  public loadingCreate: boolean;

  private $userCreate: UsuarioCreate;

  private $userCreateSubscription: Subscription;

  createForm = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rol: ['', Validators.required]
  });
  
  constructor(private sweetAlertService: SweetAlertService, private userService: UserService,
                public routeService: RouteService, private fb: FormBuilder){}

  ngOnInit() {
    if(this.$role) (<FormControl>this.createForm.controls['rol']).setValue(this.$role);
  }

  ngOnDestroy() {
    if(this.$userCreateSubscription) this.$userCreateSubscription.unsubscribe();
  }

  create(){

    this.$userCreate = this.createForm.value as UsuarioCreate;

    if(this.$userCreate){
      this.$userCreateSubscription = this.userService.create(this.$userCreate).subscribe(
        (result)=>{          
          this.refresh();
          this.loadingCreate = false;
          this.sweetAlertService.successMsg("Creación Exitosa", "Usuario creado correctamente");
        },
        (error) => {
          this.sweetAlertService.errorMsg(error.error.errors[0].msg);
          this.loadingCreate = false;
        });
    }
    else{
      this.loadingCreate = false;
      this.sweetAlertService.errorMsg("Formulario Incompleto");
    }
  }

  reset(){ this.routeService.goToDashboard('usuarios'); }
  refresh(){ this.loginOutput.emit(false); }

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