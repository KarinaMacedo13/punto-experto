import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { EmailData } from 'src/app/shared/interfaces/email';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  emailData!: EmailData[];

  constructor(private firestoreservice:FirestoreService) { }

  ngOnInit(): void {
    this.firestoreservice.getEmail().subscribe(emailData => {
      this.emailData = emailData;
      console.log(this.emailData);
    })
  }

}
