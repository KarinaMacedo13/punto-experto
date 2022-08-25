import { EventEmitter, Injectable, Output } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WorkersData } from 'src/app/shared/interfaces/worker';
import { EmailData } from '../shared/interfaces/email';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Output() searchModal: EventEmitter<any> = new EventEmitter();

  constructor(private firestore: Firestore) { }

  addWorkers( workersData: WorkersData) {
    const workersRef = collection(this.firestore, 'MasterBuilders');
    return addDoc(workersRef, workersData);
  }
  addEmail( emailData: EmailData) {
    const emailRef = collection(this.firestore, 'emailData');
    return addDoc(emailRef, emailData);
  }
  getMaster(): Observable<WorkersData[]>{
    const workersRef = collection(this.firestore, 'dataworker');
    return collectionData(workersRef, {idField: 'id'}) as Observable<WorkersData[]>;
  }
  getEmail(): Observable<EmailData[]>{
    const emailRef = collection(this.firestore, 'emailData');
    return collectionData(emailRef, {idField: 'id'}) as Observable<EmailData[]>;
  }
}
