import { NetworkServiceProvider } from './../providers/network-service/network-service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  platform: any;
  statusBar: any;
  splashScreen: any;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    storage: Storage,
    networkService: NetworkServiceProvider) {
    networkService.initializeNetwork();
    this.platform = platform;
    this.statusBar = statusBar;
    this.splashScreen = splashScreen;
    storage
      .get('is_logged_in')
      .then(val => {
        if (val == 'true'){
          this.rootPage = 'FeedPage';
          //this.rootPage = TabsPage;     
          this.loadPlatform();
        }else{
          //this.rootPage = 'FilterPage';
          this.rootPage = 'FeedPage';
        }
      })
      .catch(err => {
        //this.rootPage = 'FilterPage';
        this.rootPage = 'FeedPage';
        this.loadPlatform();
      });      

  }

  loadPlatform(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
}
