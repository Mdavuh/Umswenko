import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-city-modal',
  templateUrl: 'city-modal.html'
})
export class CityModalPage {
  
  city: string;
  cityArray: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private view: ViewController,
              public toastServ: ToastServiceProvider) {
    this.cityArray = this.navParams.get('data');
    console.log(this.cityArray);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityModalPage');
  }

  closeModal() {
    if ((this.city == null) || (this.city == '')){
      this.toastServ.showToast("Please Select a City",
      3000)
    }else{
      this.view.dismiss(this.city);
    }    
  }
}
