import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CITIES } from '../../constants';
import { TabsPage } from '../tabs/tabs';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  cityArray: any = [];
  city: String;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private toastServ: ToastServiceProvider) {
    for (let c of CITIES) {
      this.cityArray.push(c);
    }
  }

  openPage(page: string){

    if (page == "LoginPage"){
      this.navCtrl.push("LoginPage");
    }else if (page == "HomePage"){    
      if (this.city){
        this.navCtrl.setRoot(TabsPage, { filterBy: this.city });
      }else{
        this.toastServ.showToast('Please select a city', 3000);
      }      
    }else if(page == "RegisterPage"){
      this.navCtrl.push('RegisterPage');
    }
    
  }
  
}
