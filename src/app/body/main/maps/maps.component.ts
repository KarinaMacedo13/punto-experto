import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { coordenadasSJL, coordenadasRimac } from './coordenates.const';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: any;
  latitude: number = 0;
  longitute: number =0;
  coordinates = [];
  ciudad: string = '';
  polygon: any;

  countries = [
    { id: 'sjl', name: 'SJL' },
    { id: 'huachipa', name: 'Huachipa' },
  ];

  constructor() {
  }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(-11.916861105255746, -76.992753860802),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
  }

  onSubmit() {
    this.ciudad = 'sjl';
    console.log('ciudad seleccionada: ', this.ciudad);

    if (this.ciudad == 'sjl') {
      this.dibujarCiudad(coordenadasSJL);
    }
    if (this.ciudad == 'rimac') {
      this.dibujarCiudad(coordenadasRimac);
    }

   // this.limpiarMapa();
  }

  limpiarMapa() {
    this.polygon = new google.maps.Polygon({});
    this.polygon.setMap(null);
  }

  dibujarCiudad(coordenas: any) {
    this.polygon = new google.maps.Polygon({
      paths: coordenas,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    this.polygon.setMap(this.map);

    // Crear el objeto con sus limites
    var bounds = new google.maps.LatLngBounds();
    // Obtener rutas del polígono y establecer los detectores de eventos para cada ruta por separado
    this.polygon.getPath().forEach(function (path:any, index:any) {
      bounds.extend(path);
    });
    // Fit Polygon path bounds
    this.map.fitBounds(bounds);
  }
}
