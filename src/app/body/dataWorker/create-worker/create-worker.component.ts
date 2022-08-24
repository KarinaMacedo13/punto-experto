import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Storage } from '@angular/fire/storage'

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {
  photoProfile:boolean =false;
  form!: FormGroup;
  firestoreService: any;


  constructor( firestoreService: FirestoreService,
    private formBuilder: FormBuilder, private storage: Storage,
  ) {this.buildForm();}

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      names: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      secondLastname: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email ] ],
      dni: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      age: ['', [Validators.required]],
      creation: ['', [Validators.required]],
      certificados: [[], ],
      especialidad: ['', [Validators.required]],
      ocupation: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      url_photo: [''],
      url_projects: [''],
      experience: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      areaWorker: [[],],
      ubigeo: [''],

    })
  }

/*     // validación de inputs
    get names(){ return this.form.get('names') }
    get lastname(){ return this.form.get('lastname') }
    get secondLastname(){ return this.form.get('secondLastname') }
    get cellphone(){ return this.form.get('cellphone') }
    get email(){ return this.form.get('email') }
    get dni(){ return this.form.get('dni') }
    get birth(){ return this.form.get('birth') }
    get age(){ return this.form.get('age') }
    get creation(){ return this.form.get('creation') }
    get certificados(){ return this.form.get('certificados') }
    get especialidad(){ return this.form.get('especialidad') }
    get ocupation(){ return this.form.get('ocupation') }
    get departamento(){ return this.form.get('departamento') }
    get provincia(){ return this.form.get('provincia') }
    get distrito(){ return this.form.get('distrito') }
    get url_photo(){ return this.form.get('url_photo') }
    get url_projects(){ return this.form.get('url_projects') }
    get experience(){ return this.form.get('experience') }
    get direccion(){ return this.form.get('direccion') }
    get areaWorker(){ return this.form.get('areaWorker') } */
    addCertificado(elemento:any){
      console.log(elemento);
      this.form.value.certificados.push(elemento.value)
      console.log(this.form.value)
      //--se limpie nuevamente
    }

    addAreaWork(elemento:any){
      console.log(elemento);
      this.form.value.areaWorker.push(elemento.value)
      console.log(this.form.value)
    }

    addAuthorizationWassap(value:any){
      console.log('aaaaaaaaaaaa')
      console.log(value)
    }

    save(event:Event) {
      event.preventDefault();
      console.log("dataaaaasin validar");
      console.log(this.form.value)
      if(this.form.valid){
        if(this.form.value.userRolId === 1){
          this.form.value.admin = true
        }else {this.form.value.admin = false};
        console.log("this.formCreateUser");
        console.log(this.form.value);
       // this.createUser(this.form.value)
      } else {
        this.form.markAllAsTouched();
      }
    }

  eventPhotoProfile(){
    this.photoProfile = true;
  }
  addPhotoProfile(){

  }

/*   async onSubmit(){
    console.log(this.form.value)
    const response = await this.firestoreService.addMaster(this.form.value)
    console.log(response)
  } */
}
