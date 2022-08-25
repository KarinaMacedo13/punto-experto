import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


// creación de templates de dialogos de avisos generales
@Component({
  templateUrl: 'dialoginitial.component.html',
  styleUrls: ['dialoginitial.component.css']
})

export class DialogOptionInitial  {
  constructor( public dialogRef: MatDialogRef<DialogOptionInitial>, @Inject(MAT_DIALOG_DATA) public data: DialogOptionInitial,) {}
  onNoClick(): void {this.dialogRef.close();}
  addAuthorization(){

  }
}
