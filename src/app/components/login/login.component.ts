import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { SweetAlertService } from 'src/app/services/sweet.alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  loginForm = this.fb.group({
    correo: ['jhonatanAdmin@hotmail.com', [Validators.required, Validators.email]],
    password: ['hola1234', Validators.required]
  });

  loading: boolean = false;

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