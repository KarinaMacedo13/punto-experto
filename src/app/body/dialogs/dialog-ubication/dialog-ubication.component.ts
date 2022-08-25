import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ignoreElements, Subject } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ubications } from '../../../shared/ubications.const';

@Component({
  selector: 'app-dialog-ubication',
  templateUrl: './dialog-ubication.component.html',
  styleUrls: ['./dialog-ubication.component.css']
})
export class DialogUbicationComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DialogUbicationComponent>,private firestoreservice:FirestoreService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {}
  onNoClick(): void {this.dialogRef.close();}

  public searchTerm$= new Subject<any>();
  public listUbications:any = ubications;
  public listFiltered:any = [];

  ngOnInit(): void {
    console.log(this.listUbications);
    this.filterList();
  }

  filterList = (): void => {
    this.searchTerm$.subscribe(term => {
       this.listFiltered = this.listUbications.filter((item:any) => item.distrito.toLowerCase().indexOf(term.value.toLowerCase()) >= 0).slice(0,10);
      });
  }
  getSelected(value:any) {
    console.log('soy el valor',value.length);
    if(value){
      this.firestoreservice.searchModal.emit({
        dataUbication: value.district,
      });
    }
  }
}
