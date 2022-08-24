import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ubications } from './ubications.const';

@Component({
  selector: 'app-dialog-ubication',
  templateUrl: './dialog-ubication.component.html',
  styleUrls: ['./dialog-ubication.component.css']
})
export class DialogUbicationComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DialogUbicationComponent>,) {}
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
       this.listFiltered = this.listUbications
        .filter((item:any) => item.name.toLowerCase().indexOf(term.value.toLowerCase()) >= 0).slice(0,10);
    });
  }

}
