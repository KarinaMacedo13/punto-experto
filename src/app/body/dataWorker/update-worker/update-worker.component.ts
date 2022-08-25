import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.css']
})
export class UpdateWorkerComponent implements OnInit {
worker!: WorkersData[];
  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.getMaster().subscribe(master=>{console.log(master)})
  }

      // formularios reactivos
  //firebase

}
