import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderNavComponent } from "../header-nav/header-nav.component";
import { MainComponent } from "./main/main/main.component";
import { MapsComponent } from "./main/maps/maps.component";


const routes: Routes = [
  // {path:'maps' , component: MapsComponent,},
  {
    path:'', component: HeaderNavComponent,
    children: [
      {path:'' , component: MainComponent,}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
