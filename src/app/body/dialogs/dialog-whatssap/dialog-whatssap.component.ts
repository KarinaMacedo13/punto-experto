import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-whatssap',
  templateUrl: './dialog-whatssap.component.html',
  styleUrls: ['./dialog-whatssap.component.css']
})
export class DialogWhatssapComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
