import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout(){
    return signOut(this.auth)
  }
}
