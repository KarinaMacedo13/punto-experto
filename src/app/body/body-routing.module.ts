import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderNavComponent } from "../header-nav/header-nav.component";
import { CreateWorkerComponent } from "./dataWorker/create-worker/create-worker.component";
import { UpdateWorkerComponent } from "./dataWorker/update-worker/update-worker.component";
import { MainComponent } from "./main/main/main.component";
import { MapsComponent } from "./main/maps/maps.component";


const routes: Routes = [
  // {path:'maps' , component: MapsComponent,},
  {
    path:'', component: HeaderNavComponent,
    children: [
      {path:'' , component: MainComponent,}
    ]
  },
  {path:'crear' , component: CreateWorkerComponent,},
  {path:'actualizar' , component: UpdateWorkerComponent,}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
