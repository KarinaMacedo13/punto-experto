import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Component({
  selector: 'app-infobuilders',
  templateUrl: './infobuilders.component.html',
  styleUrls: ['./infobuilders.component.css']
})
export class InfobuildersComponent implements OnInit {
  workerFilter !: WorkersData[];
  workerId: string = '1';

  constructor(private firestoreservice:FirestoreService) { }

  ngOnInit(): void {
    this.firestoreservice.getMaster().subscribe(workersData => {
      const workersdata = workersData;
      this.workerFilter = workersdata.filter(worker => worker.id === this.workerId)
      console.log(this.workerFilter);
    })
  }

}
