import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderNavComponent } from "../header-nav/header-nav.component";
import { CreateWorkerComponent } from "./dataWorker/create-worker/create-worker.component";
import { MessageComponent } from "./dataWorker/message/message.component";
import { OportunityComponent } from "./dataWorker/oportunity/oportunity.component";
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

  {path:'oportunity' , component: OportunityComponent,
 },
  {path:'oportunity/actualizar' , component: UpdateWorkerComponent,},

  {path:'oportunity/message' , component: MessageComponent,}




]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
