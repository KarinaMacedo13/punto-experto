import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmailComponent } from 'src/app/body/dialogs/dialog-email/dialog-email.component';
import { DialogWhatssapComponent } from 'src/app/body/dialogs/dialog-whatssap/dialog-whatssap.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Component({
  selector: 'app-infobuilders',
  templateUrl: './infobuilders.component.html',
  styleUrls: ['./infobuilders.component.css']
})
export class InfobuildersComponent implements OnInit {
  workerFilter !: WorkersData[];
  workerId: string = '1';
  name: string = '';

  constructor(private firestoreservice:FirestoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestoreservice.getMaster().subscribe(workersData => {
      this.workerFilter = workersData;
      // this.workerFilter = workersdata.filter(worker => worker.id === this.workerId)
      console.log(this.workerFilter);
    })
  }
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
