import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { EmailData } from '../../../shared/interfaces/email'
import { EmailConfirmationComponent } from '../email-confirmation/email-confirmation.component';
@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.css']
})
export class DialogEmailComponent implements OnInit {
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any,private firestoreService:FirestoreService,public dialog: MatDialog) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      correo: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
    console.log(this.emailForm);
  }
  ngOnInit(): void {
  }
  sendEmail() {
    console.log('holaaa');
    const EMAIL: EmailData = {
      name: this.emailForm.get('name')?.value,
      correo: this.emailForm.get('correo')?.value,
      phone: this.emailForm.get('phone')?.value,
      message: this.emailForm.get('message')?.value,
    }
    console.log(EMAIL);
    this.onSubmit(EMAIL);
  }
  async onSubmit(emailData:EmailData) {
    try {
      const response = await this.firestoreService.addEmail(emailData);
      console.log(response)
      this.dialog.open(EmailConfirmationComponent, {
        data: this.data
      });
    }catch(error){
      console.log(error)
    }
  }
}
