import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
/*   apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: -14.2138564606, lng: -75.9066563702};
  zoom = 10;

  vertices: google.maps.LatLngLiteral[] = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAm-0FeG697G0-PipkHsCfwFss_w1a6XVU', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  } */

  ngOnInit(): void {
  }

}
