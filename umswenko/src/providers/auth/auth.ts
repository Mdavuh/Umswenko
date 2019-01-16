import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import * as firebaseAuth from 'firebase/auth';
import { ToastServiceProvider } from '../toast-service/toast-service';
import { NavController } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  name: string;
  loggedOn: string;
  firebaseDb: firebaseAuth;
  @ViewChild('content') nav: NavController;

  constructor(
    private storage: Storage,
    public toastServ: ToastServiceProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }

  logout() {
    this.toastServ.showToast('Goodbye ' + this.name, 3000);
    this.storage.set('is_logged_in', 'false');
  }

  getStorageValues(): Observable <any> {
    
    return new Observable(observer =>{
      this.storage
        .get('is_logged_in')
        .then(val => {
          this.loggedOn = val;
          console.log('auth: loggedOn ' + this.loggedOn);
          this.storage
            .get('name')
            .then(val => {
              this.name = val;
              console.log('name:  ' + this.name);
              observer.next({
                key: this.name
              });
              this.logout();
              observer.complete();
            })
            .catch(err => {
              console.log('error: ' + err.message);
            });
        })
        .catch(err => {
          console.log('error: ' + err.message);
        });
    })
   
  }
}
