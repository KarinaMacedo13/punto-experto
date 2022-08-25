import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from "@angular/core";

import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatDialogModule } from "@angular/material/dialog";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { BodyRoutingModule } from "./body-routing.module";
import { MainComponent } from './main/main/main.component';
import { MapsComponent } from './main/maps/maps.component';
import { MasterbuildersComponent } from './main/masterbuilders/masterbuilders.component';
import { CreateWorkerComponent } from './dataWorker/create-worker/create-worker.component';
import { UpdateWorkerComponent } from './dataWorker/update-worker/update-worker.component';
import { DialogOptionInitial } from "./dialogs/dialogInitial/dialoginitial.component";
import { DialogUbicationComponent } from './dialogs/dialog-ubication/dialog-ubication.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InfobuildersComponent } from './main/masterbuilders/infobuilders/infobuilders.component';
import { DialogWhatssapComponent } from './dialogs/dialog-whatssap/dialog-whatssap.component';
import { DialogEmailComponent } from './dialogs/dialog-email/dialog-email.component';
import { DialogOptionsComponent } from './dialogs/dialog-options/dialog-options.component';

import { DialogLoginComponent } from './dialogs/dialog-login/dialog-login.component';
import { OportunityComponent } from './dataWorker/oportunity/oportunity.component';
import { MessageComponent } from './dataWorker/message/message.component';


@NgModule ({
  declarations: [
    MainComponent,
    MapsComponent,
    MasterbuildersComponent,
    CreateWorkerComponent,
    UpdateWorkerComponent,
    DialogOptionInitial,
    DialogUbicationComponent,
    InfobuildersComponent,
    DialogWhatssapComponent,
    DialogEmailComponent,
    DialogOptionsComponent,
    DialogLoginComponent,
    OportunityComponent,
    MessageComponent

  ],
  imports: [
    BodyRoutingModule,
    AngularMaterialModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule

  ]
})
export class BodyModule { }
