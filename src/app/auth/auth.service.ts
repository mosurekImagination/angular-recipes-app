import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reduters';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signUp(email: string, password: string) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( user => {
      this.store.dispatch(new AuthActions.SignUp());
      this.setToken();
    })
  .catch(
    error => console.log(error)
  );
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.SignIn());
          this.router.navigate(['/']);
          this.setToken();
        }
      ).catch(
        error => console.log(error)
    );

  }

  setToken() {
    firebase.auth().currentUser.getIdToken()
      .then( token => this.store.dispatch(new AuthActions.SetToken(token)));
  }

  //
  // isAuthenticated() {
  //   return this.token !== '';
  // }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
    this.token = '';
    this.router.navigate(['/']);
  }
}
