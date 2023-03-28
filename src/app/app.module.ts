import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './user.layout/user.layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchComponent } from './components/search/search.component';
import { ProductosModule } from './components/productos/productos.module';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './components/usuarios/usuarios.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserLayoutComponent,
    DashboardComponent,
    NavbarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ProductosModule,
    SharedModule,
    UsuariosModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }