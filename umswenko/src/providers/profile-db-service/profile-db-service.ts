import { UserProfile } from './../../models/userprofile/profile';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

@Injectable()
export class ProfileDbServiceProvider {
  ref = firebase.firestore().collection('profiles');
  id: string;

  constructor() {}

  postProfile(data): Observable<any> {
    return new Observable(observer => {
      this.ref.add(data).then(doc => {
        observer.next({
          key: doc.id
        });
        observer.complete();
      });
    });
  }

  getProfiles(): Observable<any> {
    return new Observable(observer => {
      this.ref.onSnapshot(querySnapshot => {
        let userProfile = [];
        querySnapshot.forEach(doc => {
          let data = doc.data();
          userProfile.push({
            doc
          });
        });
        observer.next(userProfile);
      });
    });
  }

  getProfileByUserName(username: string): Observable<any> {
    let dbRef = firebase
      .firestore()
      .collection('profiles')
      .where('userName', '==', username);

    return new Observable(observer => {
      dbRef
        .get()
        .then(function(querySnapshot) {
          let userProfile = [];
          let data;
          querySnapshot.forEach(function(doc) {
            data = doc.data();
            observer.next(data);
          });
          observer.complete();
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    });
  }
}
