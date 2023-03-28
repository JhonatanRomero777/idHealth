import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { Role1Guard } from '../guards/role1.guard';

const routes: Routes = [

  //ALL
  { path: 'home', component: DashboardComponent },

  { path: 'productos',
    loadChildren: () => import('../components/productos/productos.module').then(x=>x.ProductosModule)
  },

  { path: 'categorias',
    loadChildren: () => import('../components/categorias/categorias.module').then(x=>x.CategoriasModule)
  },

  { path: 'usuarios',
    canActivate: [Role1Guard],
    loadChildren: () => import('../components/usuarios/usuarios.module').then(x=>x.UsuariosModule)
  },
  { path: "perfil",
    loadChildren: () => import('../components/perfil/perfil.module').then(x=>x.PerfilModule)
  },
  
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }