import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ref, Storage, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ubications } from 'src/app/shared/ubications.const';
import { Subject } from 'rxjs';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {
  photoProfile:boolean =false;
  form!: FormGroup;
  firestoreService: any;
  valueBoolean:boolean=false;
  url:any;
  arrayProjects:any = [];
  public searchTerm$= new Subject<any>();
  public listUbications:any = ubications;
  public listFiltered:any = [];



  constructor( firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private restService: FirestoreService,
  ) {this.buildForm();}

  ngOnInit(): void {
    this.filterList();
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
      url_photo: [''],
      url_projects: [''],
      experience: ['', [Validators.required]],
      direccion: ['', ],
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

    addAuthOportunity(element:any){
     console.log(element)
     console.log(element.value)
     if(element){
      this.valueBoolean = true;
     }
    }

    uploadImagePhoto($event : any, keyWord:any) {
      const file = $event.target.files[0];
      console.log(file);
      const imgRef = ref(this.storage,`products/${file.name}`);
      uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
        this.getImagesPhoto(file.name, keyWord)}
        )
      .catch(error => console.log("upload"+error))
    }

    getImagesPhoto(file:string, keyword:any) {
      const imagesRef = ref(this.storage, `products/${file}`);
      getDownloadURL(imagesRef)
      .then(response => {this.form.value.url_photo = response, this.url=response})
      .catch(error => {console.log("listAll"+error)})
    }

    uploadImageProjects($event : any, keyWord:any) {
      const file = $event.target.files[0];
      console.log(file);
      const imgRef = ref(this.storage,`products/${file.name}`);
      uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
        this.getImagesProjects(file.name, keyWord)}
        )
      .catch(error => console.log("upload"+error))
    }

    getImagesProjects(file:string, keyword:any) {
      const imagesRef = ref(this.storage, `products/${file}`);
      getDownloadURL(imagesRef)
      .then(response => {this.arrayProjects.push(response), this.url=response})
      .catch(error => {console.log("listAll"+error)})
    }


    save(event:Event) {
      this.form.value.direccion;
      this.form.value.url_projects = this.arrayProjects;
      event.preventDefault();
      console.log("dataaaaasin validar");
      console.log(this.form.value)
        this.form.markAllAsTouched();
      this.onSubmit(this.form.value)
    }

     // conección de firebase

   async onSubmit(form:WorkersData){
    try {
      const response = await this.restService.addWorkers(form);
      console.log(response)
    }catch(error){
       console.log(error)
    }

  }

  filterList = (): void => {
    this.searchTerm$.subscribe(term => {
      console.log(term.value)
       this.listFiltered = this.listUbications.filter((item:any) => item.distrito.toLowerCase().indexOf(term.value.toLowerCase()) >= 0).slice(0,10);
      });
  }

}
