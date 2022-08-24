import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, } from '@angular/fire/firestore';
import { WorkersData } from 'src/app/shared/interfaces/worker';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }
  
  addMaster( workersData: WorkersData) {
    const workersRef = collection(this.firestore, 'MasterBuilders');
    return addDoc(workersRef, workersData);
  }
}
