import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  @Output() loginOutput = new EventEmitter<boolean>();
  
  @Input() $uid: string;
  $roles: string[] = environment.roles;

  public loadingUpdate: boolean;

  private $userUpdateSubscription: Subscription;

  private $userSubscription: Subscription;

  updateForm = this.fb.group({
    uid: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    correo: [{value:'',  disabled: true}],
    password: [''],
    rol: ['', Validators.required]
  });
  
  constructor(private authService: AuthService,
              private sweetAlertService: SweetAlertService, private userService: UserService,
              public routeService: RouteService, private fb: FormBuilder){}

  ngOnInit() {
    if(this.$uid){
      this.$userSubscription = this.userService.index().subscribe((response)=>{

        if(response.usuarios){
  
          const val = this.authService.getUser();
  
          response.usuarios = response.usuarios.filter(function ($user: Usuario) {
            return $user.uid.toLowerCase().indexOf(val) !== -1 || !val;
          });
  
          this.userService.setUser(response.usuarios[0]);
          this.setCurrentUser();
        }
      });
    }
    else this.setCurrentUser();
  }

  setCurrentUser(){
    let user = this.userService.getUser();

    if(user){
      (<FormControl>this.updateForm.controls['uid']).setValue(user.uid);
      (<FormControl>this.updateForm.controls['nombre']).setValue(user.nombre);
      (<FormControl>this.updateForm.controls['correo']).setValue(user.correo);
      (<FormControl>this.updateForm.controls['rol']).setValue(user.rol);
    }
    else this.reset();
  }

  ngOnDestroy() {
    if(this.$userUpdateSubscription) this.$userUpdateSubscription.unsubscribe();
    if(this.$userSubscription) this.$userSubscription.unsubscribe();
  }

  update(){

    //this.userService.getUser().correo !== this.updateForm.value.correo
    if(true){

      this.userService.setUser(this.updateForm.value as Usuario);

      this.$userUpdateSubscription = this.userService.update().subscribe(
      (result)=>{          
        
        if(this.$uid) this.refresh();
        else this.reset();

        this.loadingUpdate = false;
        this.sweetAlertService
        .successMsg("Actualización Exitosa", "Uusario actualizado correctamente");
      },
      (error) => {
        console.log(error);
        this.sweetAlertService.errorMsg(error.error.msg);
        this.loadingUpdate = false;
      });
    }
    else{
      this.loadingUpdate = false;
      this.reset();
    }
  }

  reset(){ this.routeService.goToDashboard('usuarios'); }
  refresh(){ this.routeService.goToDashboard('home'); }
}