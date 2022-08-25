import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { coordenadasSJL, coordenadasRimac } from './coordenates.const';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';
import { MatDialog } from '@angular/material/dialog';
import { lambayeque } from './lambayeque.clean.const';
import {piura} from './piura.clean.const';
import {lima} from './lima.clean.const';
import { DialogOptionInitial } from '../../dialogs/dialogInitial/dialoginitial.component';

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
  polygon: any;
  datamapv1 = new Map(); // key: DEPARTAMENTO_PROVINCIA_DISTRITO , value: COORDENADAS A DIBUJAR
  openAlert:any;
  public lat: number = 0;
  public lng: number = 0;
  direction!:any;

  constructor( public dialog: MatDialog,) {
    let openAlert = false;
    const dialogRef = this.dialog.open(DialogOptionInitial , {data:{openAlert}});
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result)
    this.openAlert= result;
  });
  }

  // funcionalidad de styles

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
     geocoder.geocode({ location: latlng }, (results:any, status:any) => {

      this.direction=results[0].formatted_address;
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
        this.getAddress(this.lat, this.lng);
      }
    },
      (error: any) => alert(error));
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
  //fin de funcionalidad

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(-5.19722, -80.6267),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );

    this.loadDataMap(this.datamapv1);

    //el mapa por defecto pintará a PIURA (DISTRITO)
    this.onUbicationObtained('PIURA_PIURA_PIURA');

  }

  ubication:any;
  openModalUbication(){
    let district;
    const dialogRef = this.dialog.open(DialogUbicationComponent, {data:{district}});
    dialogRef.afterClosed().subscribe(result => {
        const depart = result.district.departamento.toUpperCase();
        const prov = result.district.provincia.toUpperCase();
        const distr = result.district.distrito.toUpperCase();
        const formatDirectionShow = localStorage.setItem("dirección", `${depart}, ${ prov}, ${ distr}`);
        const formatDirection = `${depart}_${prov}_${distr}`;
        this.onUbicationObtained(formatDirection)
    });
  }

  loadDataMap(datamap:any) {
    this.extractDataFromJSONAndAddToMap(lambayeque, this.datamapv1);
    this.extractDataFromJSONAndAddToMap(piura, this.datamapv1);
    this.extractDataFromJSONAndAddToMap(lima, this.datamapv1);
  }

  extractDataFromJSONAndAddToMap(rawdata:any, datamap:any) {
    for (var i=0; i<rawdata.jsonData.length; i++) {
      for (var key in rawdata.jsonData[i]) {
        const data1 = rawdata.jsonData[i];
        const fields = rawdata.jsonData[i].fields;
        const fieldsGeoShape = fields.geo_shape;
        const fieldDepartamento = fields.nombdep;
        const fieldProvincia = fields.nombprov;
        const fieldDistrito = fields.nombdist;
        //console.log(fieldDepartamento+"_"+fieldProvincia+"_"+fieldDistrito); //[NO BORRAR] Util para ver las keys disponibles
        //console.log("{ departamento:" + "'"+ fieldDepartamento+"', provincia: '"+fieldProvincia+"', distrito: '"+fieldDistrito+ "'},"); //[NO BORRAR] Util para construie el json usado en ubications.const.ts
        datamap.set(fieldDepartamento+"_"+fieldProvincia+"_"+fieldDistrito, fieldsGeoShape);
        }
    }
  }

  getGoogleMapCoordenatesFromDataMap(datamap:any, ciudad:String) {
    var googleCoords = []
    const dataToPrint= datamap.get(ciudad); //esto se debe obtener desde frontend!!!
    for (var i=0; i<dataToPrint.coordinates.length; i++) {
      const currentLat = dataToPrint.coordinates[i].lat;
      const currentLng = dataToPrint.coordinates[i].lng;
      googleCoords[i] = new google.maps.LatLng(currentLat, currentLng);
    }
    return googleCoords;
  }

  onUbicationObtained(data:string) {
  //borramos el poligono siempre y cuando ya exista por eso el != null
    if (this.polygon != null) {
      this.polygon.setMap(null);
    }
    const newCoordenadasADibujar = this.getGoogleMapCoordenatesFromDataMap(this.datamapv1, data);
    this.dibujarCiudad(newCoordenadasADibujar);
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

  removerDibujoCiudad(coordenas: any) {
    this.polygon = new google.maps.Polygon({
      paths: coordenas,
      strokeColor: '#FF0000',
      strokeOpacity: 0.0,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.0,
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
