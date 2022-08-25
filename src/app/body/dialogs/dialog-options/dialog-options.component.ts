import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-options',
  templateUrl: './dialog-options.component.html',
  styleUrls: ['./dialog-options.component.css']
})
export class DialogOptionsComponent implements OnInit {

  constructor(private firestoreservice:FirestoreService) { }

  ngOnInit(): void {
  }
  optionClick(option: string){
    console.log(option);
    this.firestoreservice.searchModal.emit({
      data: option,
    });
  }
}
