import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    UsuariosModule
  ]
})
export class PerfilModule { }
