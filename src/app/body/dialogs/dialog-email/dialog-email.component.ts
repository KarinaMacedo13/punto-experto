import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailData } from '../../../shared/interfaces/email'
@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.css']
})
export class DialogEmailComponent implements OnInit {
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      correo: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
   }
  ngOnInit(): void {
  }
  sendEmail() {
    const EMAIL: EmailData = {
      name: this.emailForm.get('name')?.value,
      correo: this.emailForm.get('correo')?.value,
      phone: this.emailForm.get('phone')?.value,
      message: this.emailForm.get('message')?.value,
    }
    console.log(EMAIL);
  }
}
