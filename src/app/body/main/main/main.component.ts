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
  public lat: number = 0;
  public lng: number = 0;
  diection:any = localStorage.getItem("dirección")?localStorage.getItem("dirección"):"Piura, Piura, Piura";



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



    addUbicationCurrently(){
        this.getLocation();
        this.openAlert=false;
    }

    addUbicationDefault(){
        this.openAlert=false;
    }

    getAddress(lat: number, lng: number) {
      console.log('Finding Address');
      if (navigator.geolocation) {
         let geocoder = new google.maps.Geocoder();
         let latlng = new google.maps.LatLng(lat, lng);
         let request = { LatLng: latlng };
         geocoder.geocode({ location: latlng }, (results:any, status) => {
          console.log(results[0].plus_code)
          localStorage.setItem("address", results[0].formatted_address)
     });
   }
  }

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(position)
            console.log("position")
            console.log(this.lat);
            console.log(this.lng);

            console.log("====> tipo de dato: ", this.lat);
            this.getAddress(this.lat, this.lng);
          }
        },
          (error: any) => alert(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

}
