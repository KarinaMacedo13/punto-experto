import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionInitial } from '../../dialogs/dialogInitial/dialoginitial.component';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public lat:any;
  public lng:any;


  constructor(
    public dialog: MatDialog,
    ) {  }
    openAlert:any;
    ngOnInit(): void {
      let openAlert = false;
      const dialogRef = this.dialog.open(DialogOptionInitial , {data:{openAlert}});


      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.openAlert= result;
    });
    }

    openModalUbication(){
      this.dialog.open(DialogUbicationComponent, {})
    }

    addUbicationCurrently(){
        this.getLocation();
        this.openAlert=false;
    }

    addUbicationDefault(){

        this.openAlert=false;
    }

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lng);
          }
        },
          (error: any) => alert(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }




}
