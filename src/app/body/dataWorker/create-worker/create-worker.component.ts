import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {
  photoProfile:boolean =false;
  form: FormGroup;
  firestoreService: any;

  constructor( firestoreService: FirestoreService) { 
    this.form = new FormGroup({
    names: new FormControl(),
    lastname: new FormControl(),
    secondLastname: new FormControl(),
    cellphone: new FormControl(),
    dni: new FormControl(),
    birth: new FormControl(),
    age: new FormControl(),
    creation: new FormControl(),
    certificados: new FormControl(),
    especialidad: new FormControl(),
    ocupation: new FormControl(),
    departamento: new FormControl(),
    provincia: new FormControl(),
    distrito: new FormControl(),
    url_photo: new FormControl(),
    url_projects: new FormControl(),
    experience: new FormControl(),
    direccion: new FormControl(),
    areaWorker: new FormControl(),
    ubigeo: new FormControl(),
    })
  }

  ngOnInit(): void {
  }

  eventPhotoProfile(){
    this.photoProfile = true;
  }
  addPhotoProfile(){

  }

  async onSubmit(){
    console.log(this.form.value)
    const response = await this.firestoreService.addMaster(this.form.value)
    console.log(response)
  }
}
