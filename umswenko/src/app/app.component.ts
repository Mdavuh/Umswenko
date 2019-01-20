import { NetworkServiceProvider } from './../providers/network-service/network-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GooglePlus } from '@ionic-native/google-plus';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  platform: any;
  statusBar: any;
  splashScreen: any;
  public is_logged_on: boolean = false;
  emailType: string;
  authProvider: AuthProvider;
  @ViewChild('content') nav: NavController;
  store: Storage;
  toastServ: ToastServiceProvider;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage,
    authService: AuthProvider,
    public events: Events,
    private screenOrientation: ScreenOrientation,
    private googlePlus: GooglePlus
  ) {
    this.platform = platform;
    this.statusBar = statusBar;
    this.splashScreen = splashScreen;
    this.authProvider = authService;

    console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'

    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    events.subscribe('user:authinfo', (authinfo, time) => {
      console.log('User Log Info: ', authinfo, 'at', time);
      this.is_logged_on = authinfo;
    });

    storage
      .get('is_logged_in')
      .then(val => {
        if (val == 'true') {
          this.rootPage = TabsPage;
          this.loadPlatform();
        } else {
          this.rootPage = 'FilterPage';
          this.loadPlatform();
        }
      })
      .catch(err => {
        this.rootPage = 'FilterPage';
        this.loadPlatform();
      });
  }

  loadPlatform() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    console.log('got to logout bro!!!');
    this.authProvider.getStorageValues().subscribe(
      x => {
        console.log('Logout Observer got a next value: ' + x);
      },
      err => {
        console.error('Logout Observer got an error: ' + err);
        this.toastServ.showToast(err.message, 3000);
      },
      () => {
        this.googlePlus.disconnect().then(res => {
          console.log('Sign Out!!');
          console.log(res);
        }).catch(res => {
          console.log(res);
        })
        this.is_logged_on = false;
        this.nav.setRoot('FilterPage');
      }
    );
  }

  signIn() {
    this.nav.push('LoginPage');
  }

  register() {
    this.nav.push('RegisterPage');
  }
}
