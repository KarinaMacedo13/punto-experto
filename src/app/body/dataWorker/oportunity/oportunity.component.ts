import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { navViewDesktop } from 'src/app/header-nav/navViewDesktop';
import { navMobPointExpert } from 'src/app/header-nav/navViewMobile';
import { AuthService } from 'src/app/services/auth.service';
import { DialogLoginComponent } from '../../dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-oportunity',
  templateUrl: './oportunity.component.html',
  styleUrls: ['./oportunity.component.css']
})
export class OportunityComponent implements OnInit {
  public navData = navMobPointExpert;
  getScreenWidth:any = window.innerWidth;
  getScreenHeight:any = window.innerHeight

  constructor(public modal: MatDialog, private authService: AuthService,
    private router: Router) {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.modal.open(DialogLoginComponent, {
      width: '25rem',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

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
  
  logOut(){
    this.authService.logout()
    .then(()=>{
      this.router.navigate([''])
    })
  }

}
