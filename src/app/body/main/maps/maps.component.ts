import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { coordenadasSJL, coordenadasRimac } from './coordenates.const';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';
import { MatDialog } from '@angular/material/dialog';
import { lambayeque } from './lambayeque.clean.const';
import {piura} from './piura.clean.const';

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

  datamapv1 = new Map(); // key: DEPARTAMENTO_PROVINCIA_DISTRITO , value: COORDENADAS A DIBUJAR

  constructor( public dialog: MatDialog,) {
  }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(-5.19722, -80.6267        ),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );

    this.loadDataMap(this.datamapv1);
  }

  ubication:any;
  openModalUbication(){
    let district;
    const dialogRef = this.dialog.open(DialogUbicationComponent, {data:{district}});
    dialogRef.afterClosed().subscribe(result => {
      const depart = result.district.departamento.toUpperCase();
      const prov = result.district.provincia.toUpperCase();
      const distr = result.district.distrito.toUpperCase();
      const formatDirection = `${depart}_${prov}_${distr}`
      console.log(formatDirection, "jjresullllltado final");

        this.onSubmit(formatDirection)
    });
  }

  loadDataMap(datamap:any) {
    this.extractDataFromJSONAndAddToMap(lambayeque, this.datamapv1);
    this.extractDataFromJSONAndAddToMap(piura, this.datamapv1);
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
        console.log(fieldDepartamento+"_"+fieldProvincia+"_"+fieldDistrito);
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


/*
maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_CHONGOYAPE
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_OYOTUN
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_TUMAN
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_PITIPO
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_JAYANCA
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_MOTUPE
5maps.component.ts:56 LAMBAYEQUE_LAMBAYEQUE_OLMOS
*/

  onSubmit(data:string) {
    //this.ciudad = 'sjl';
//aqui deben llegar esos datos
    //this.cleanPolygonsFromMap();
    const coordenadasADibujar= this.getGoogleMapCoordenatesFromDataMap(this.datamapv1, data);
    this.dibujarCiudad(coordenadasADibujar);
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
