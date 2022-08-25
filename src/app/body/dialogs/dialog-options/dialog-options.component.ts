import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-options',
  templateUrl: './dialog-options.component.html',
  styleUrls: ['./dialog-options.component.css']
})
export class DialogOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  optionClick(option: string){
    console.log(option);
  }
}
