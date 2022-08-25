import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  addWorkers( workersData: WorkersData) {
    const workersRef = collection(this.firestore, 'MasterBuilders');
    return addDoc(workersRef, workersData);
  }
  getMaster(): Observable<WorkersData[]>{
    const workersRef = collection(this.firestore, 'MasterBuilders');
    return collectionData(workersRef, {idField: 'id'}) as Observable<WorkersData[]>;
  }
}
