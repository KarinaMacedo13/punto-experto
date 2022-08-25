import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';
import { DialogOptionsComponent } from '../../dialogs/dialog-options/dialog-options.component';

@Component({
  selector: 'app-masterbuilders',
  templateUrl: './masterbuilders.component.html',
  styleUrls: ['./masterbuilders.component.css']
})
export class MasterbuildersComponent implements OnInit {
  workersData!: WorkersData[];
  option:string='';

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
      console.log('obtengo option',data.data)
    });
  }
}
