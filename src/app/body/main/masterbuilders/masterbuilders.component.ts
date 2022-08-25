import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';
import { DialogEmailComponent } from '../../dialogs/dialog-email/dialog-email.component';
import { DialogOptionsComponent } from '../../dialogs/dialog-options/dialog-options.component';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';
import { DialogWhatssapComponent } from '../../dialogs/dialog-whatssap/dialog-whatssap.component';

@Component({
  selector: 'app-masterbuilders',
  templateUrl: './masterbuilders.component.html',
  styleUrls: ['./masterbuilders.component.css']
})
export class MasterbuildersComponent implements OnInit {
  workersData!: WorkersData[];
  option:string='';
  ubication!:any;
  number:number=0;
  workerFilter !: WorkersData[];
  workerId: string = '1';
  name: string = '';
  container: boolean = true ;
  info: boolean = false;
  // qPerson:any = this.workersData.length;

  constructor(private firestoreservice:FirestoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestoreservice.getMaster().subscribe(workersData => {
      this.workersData = workersData;
      // this.number = workersData.length;
      console.log(workersData);
    })
    this.firestoreservice.getMaster().subscribe(workersData => {
      this.workerFilter = workersData;
      console.log(this.workerFilter);
    })
    this.getOptions();
    this.firestoreservice.searchModal.subscribe(data => {
      this.number = data.dataNumber;
    });
  }
  navigation(id:string){
    console.log(id);
    this.container = !this.container;
    this.info = !this.info;
  }
  openModal(){
    this.dialog.open(DialogOptionsComponent, {
    });
  }
  getOptions(){
    this.firestoreservice.searchModal.subscribe(data => {
      this.option = data.data;
      this.ubication = data.dataUbication;
      console.log('obtengo option',data.data)
      console.log('obtengo ubicacion',data.dataUbication)
    });
  }
  openModalUbication(){
    let district;
    const dialogRef = this.dialog.open(DialogUbicationComponent, {data:{district}});
    dialogRef.afterClosed().subscribe(result => {
        const depart = result.district.departamento.toUpperCase();
        const prov = result.district.provincia.toUpperCase();
        const distr = result.district.distrito.toUpperCase();
    });
  }
  //infobuilders
  openDialogWhatssap(cellphone:number,name:string){
    this.dialog.open(DialogWhatssapComponent, {
      data: {
        phone:cellphone,
        name:name,
      },
    });
  }
  openDialogMensage(name:string){
    this.dialog.open(DialogEmailComponent, {
      data: name,
    });
  }
}
