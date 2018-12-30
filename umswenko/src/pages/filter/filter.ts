import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CITIES } from '../../constants';
import { TabsPage } from '../tabs/tabs';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { NetworkServiceProvider } from '../../providers/network-service/network-service';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  cityArray: any = [];
  city: String;
  public isConnected: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private toastServ: ToastServiceProvider,
              public networkService: NetworkServiceProvider) {
    for (let c of CITIES) {
      this.cityArray.push(c);
    }
    this.testNetwork();
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

  testNetwork(): void {
    this.networkService.initializeNetwork();
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      console.log('network test result the first: ' + connected);
      this.isConnected = connected;
    },err =>{
      console.log('Network err: '  + err.message);
    },() => {
      console.log('Completed!!')
    });
    console.log('network test result: ' + this.isConnected);
    console.log('Network Type: ' + this.networkService.getNetworkType());

    this.networkService.getNetworkStatus().subscribe(data =>{
      console.log('and we tried');
      console.log(data);
    })
  }
  
}
