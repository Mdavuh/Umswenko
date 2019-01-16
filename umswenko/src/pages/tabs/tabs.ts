import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavParams, Events } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { FeedPage } from '../feed/feed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: Page;
  tab2Root: Page;
  tab3Root: Page;
  loginfo: boolean = false;

  homePageParams: any;
  
  constructor(public params: NavParams, public events: Events) {
    
    this.homePageParams =  this.params.data; 

    if (this.homePageParams) {
      this.loginfo = this.homePageParams.data.authinfo;
    }   

    this.events.publish('user:authinfo',this.loginfo, Date.now());
    
    //this.tab1Root = HomePage;
    this.tab1Root = FeedPage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    
  }
}
