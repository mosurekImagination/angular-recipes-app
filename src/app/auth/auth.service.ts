import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  constructor(private router: Router) { }

  signUp(email: string, password: string) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(
    error => console.log(error)
  );
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          console.log(response);
          this.getToken();
        }
      ).catch(
        error => console.log(error)
    );

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then( token => this.token = token);

    return this.token;
  }

  isAuthenticated() {
    return this.token !== '';
  }

  logout() {
    this.token = '';
    this.router.navigate(['/']);
  }
}
