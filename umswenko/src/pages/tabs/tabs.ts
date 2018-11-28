import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: Page;
  tab2Root: Page;
  tab3Root: Page;

  homePageParams: any;
  
  constructor(public params: NavParams) {
    
    this.homePageParams =  this.params.data;

    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    
  }
}
