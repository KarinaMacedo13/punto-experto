import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';
import { DialogOptionsComponent } from '../../dialogs/dialog-options/dialog-options.component';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';

@Component({
  selector: 'app-masterbuilders',
  templateUrl: './masterbuilders.component.html',
  styleUrls: ['./masterbuilders.component.css']
})
export class MasterbuildersComponent implements OnInit {
  workersData!: WorkersData[];
  option:string='';
  ubication!:any;
  // qPerson:any = this.workersData.length;

  constructor(private firestoreservice:FirestoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestoreservice.getMaster().subscribe(workersData => {
      this.workersData = workersData;
      console.log(workersData);
    })
    this.getOptions();
  }
  navigation(id:string){
    console.log(id);
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
}
