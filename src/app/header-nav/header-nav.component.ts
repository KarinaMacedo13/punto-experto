import { Component, OnInit, HostListener } from '@angular/core';
import { navViewDesktop } from './navViewDesktop';
import { navMobPointExpert } from './navViewMobile';
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

  public navData = navMobPointExpert;
   getScreenWidth:any = window.innerWidth;
   getScreenHeight:any = window.innerHeight

   ngOnInit(): void {
  }


// ancho jalar uno u otro metorno
@HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log(this.getScreenWidth, this.getScreenHeight)
    if(this.getScreenWidth > 820 ){
      this.navData = navViewDesktop;
    }else {
      this.navData =  navMobPointExpert ;
    }
  }



}
