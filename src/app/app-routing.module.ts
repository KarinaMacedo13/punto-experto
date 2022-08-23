import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BodyModule } from "./body/body.module";

import { HeaderNavComponent } from "./header-nav/header-nav.component";

// importando componentes

const routes: Routes = [

{ path: '', loadChildren: () => import('./body/body.module').then(m => m.BodyModule)},

]

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
