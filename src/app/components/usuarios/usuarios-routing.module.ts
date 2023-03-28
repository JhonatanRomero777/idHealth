import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "crear", component: CreateComponent },
  { path: "actualizar", component: UpdateComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }