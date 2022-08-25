import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {
  dataUser!: FormGroup;
  constructor(private formBuild: FormBuilder,
    private authService: AuthService,
    private newRoute: Router,
    private firestore: FirestoreService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.dataUser = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    console.log(this.dataUser)
  }

   loginByEmail() {
    this.authService.login(this.dataUser.value.email, this.dataUser.value.password)
      .then(res => {console.log('login succesfully', res)
          this.newRoute.navigate(['/oportunity']);
        })
      .catch(err => this.errRol())

    }

    errRol() {
      this.snackBar.open('Contraseña o correo incorrecto. Ingresar nuevamente', 'Aceptar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }

  /* ogin(){
    this.newRoute.navigate(['/oportunity']);
  } */
}
