import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionInitial } from '../../dialogs/dialogInitial/dialoginitial.component';
import { DialogUbicationComponent } from '../../dialogs/dialog-ubication/dialog-ubication.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {




  constructor(
    public dialog: MatDialog,
    ) {  }
    openAlert:any;
    ngOnInit(): void {

    }
}
