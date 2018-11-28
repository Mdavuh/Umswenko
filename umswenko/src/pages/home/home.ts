import { ToastServiceProvider } from './../../providers/toast-service/toast-service';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FEEDS } from '../../data/feeds';
import { Feed } from '../../models/feeds/feeds';
import { CITIES } from '../../constants';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  feedsArray: Feed[] = [];
  counter: number;
  filterBy: String = 'Durban';
  cityArray: any = [];
  city: String;
  name: String;
  loading: any;
  event: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private toast: ToastServiceProvider,
    private loadingCtrl: LoadingController
  ) {
      console.log(this.navParams.data);
      this.filterBy = this.navParams.get('filterBy');

      for (let c of CITIES) {
        this.cityArray.push(c);
      }

      console.log('filterBy: ' + this.filterBy);
      if (this.filterBy == null) {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        this.loading.present();

        this.storage
          .get('city')
          .then(val => {
            this.city = val;
            console.log('city: ' + val);
            this.storage
              .get('name')
              .then(val => {
                this.name = val;
                console.log('name: ' + val);
                console.log('S City ' + this.city);
                this.filterData(event);
                this.loading.dismiss();
                toast.showToast('Welcome ' + this.name, 3000);
              })
              .catch(err => {
                this.loading.dismiss();
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            this.loading.dismiss();
          });
      }else{
        this.city = this.filterBy;
        this.filterData(event);
      }
  
    }

  filterData($event) {
    console.log('Filter Data');
    this.filterBy = this.city;
    console.log(this.city);
    this.feedsArray = [];
    FEEDS.forEach(data => {
      if (data.designer.city == this.filterBy) {
        this.feedsArray.push(data);
      }
    });

    console.log(this.feedsArray);
  }

}
