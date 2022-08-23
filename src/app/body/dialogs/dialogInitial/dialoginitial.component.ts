import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


// creación de templates de dialogos de avisos generales
@Component({
  templateUrl: 'dialoginitial.component.html',
  styleUrls: ['dialoginitial.component.css']
})

export class DialogOptionInitial {
  constructor( public dialogRef: MatDialogRef<DialogOptionInitial>,) {}
  onNoClick(): void {this.dialogRef.close();}
}
