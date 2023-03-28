import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  //jhonatanAdmin@hotmail.com
  //hola1234
  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading: boolean = false;
  isRegister: boolean = false;

  userRole: string = environment.roles[1];

  loginSubscription: Subscription;

  constructor(private authService: AuthService, private sweetAlertService: SweetAlertService,
              private routeService: RouteService, private fb: FormBuilder) {}

  public signIn() {
    this.loading = true;

    this.loginSubscription = this.authService.login(this.loginForm.value as Credentials)
    .subscribe(
      (response) => {
        if(response.token) {
          this.sweetAlertService.successMsg("Bienvenido", "", 1000).then(() => {
            this.authService.setUser(response.usuario.uid);
            this.authService.setToken(response.token);
            this.routeService.goToDashboard();
          })
        }
        this.loading = false;
      },
      (error) => {
        this.sweetAlertService.errorMsg(error.error.msg);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }
}