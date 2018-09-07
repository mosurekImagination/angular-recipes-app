import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCbz-jnbMd6AUkYT-LaVSA3x8jnPk95Jd8",
      authDomain: "angular-recipe-18649.firebaseapp.com"
    }
  );
  }

}
