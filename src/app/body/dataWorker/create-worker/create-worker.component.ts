import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {
  photoProfile:boolean =false;
  constructor() { }

  ngOnInit(): void {
  }

  eventPhotoProfile(){
    this.photoProfile = true;
  }
  addPhotoProfile(){

  }

}
