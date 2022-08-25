import { Component, OnInit } from '@angular/core';
import { navViewDesktop } from './navViewDesktop';
import { navMobWorld } from './navViewMobile';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../body/dialogs/dialog-login/dialog-login.component';
import { DialogOptionInitial } from '../body/dialogs/dialogInitial/dialoginitial.component';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  public navData = navViewDesktop;
    currentRoute: string;
  constructor(private router: Router, public modal: MatDialog) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
              console.log(event);
        }
    })
  }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.modal.open(DialogLoginComponent, {
        width: '25rem',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

    // onNoClick(): void {this.modal.close();}

  ngOnInit(): void {
  }
}



