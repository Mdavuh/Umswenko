import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FeedPage } from '../pages/feed/feed';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import firebase from 'firebase';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { ProfileDbServiceProvider } from '../providers/profile-db-service/profile-db-service';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Network } from '@ionic-native/network';
import { AuthProvider } from '../providers/auth/auth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

var config = {
  apiKey: 'AIzaSyC-yRjF7Ztj2zbKUzlxDutLyYQVwsW6kOw',
  authDomain: 'umswenko-79bf9.firebaseapp.com',
  databaseURL: 'https://umswenko-79bf9.firebaseio.com',
  projectId: 'umswenko-79bf9',
  storageBucket: 'umswenko-79bf9.appspot.com',
  messagingSenderId: '60722354259'
};
firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
});

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, FeedPage, TabsPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FeedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastServiceProvider,
    ProfileDbServiceProvider,
    NetworkServiceProvider,
    Network,
    AuthProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
