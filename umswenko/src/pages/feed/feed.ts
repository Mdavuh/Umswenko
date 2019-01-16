import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Modal,
  ModalController,
  ModalOptions
} from 'ionic-angular';
import { DESIGNERS } from '../../data/designers';
import { FEEDS } from '../../data/feeds';
import { CITIES } from '../../constants';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  designers: any[] = [];
  feeds: any[] = [];
  dataParams: any;
  city: string;
  cityArray: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController
  ) {
    for (let c of CITIES) {
      this.cityArray.push(c);
    }
    this.dataParams = this.navParams.data;
    this.city = this.dataParams.data.city;

    this.loadDesigners();
    this.loadFeeds();
  }

  loadDesigners() {
    for (let data of DESIGNERS) {
      if (data.city == this.city) {
        this.designers.push(data);
      }
    }
  }

  loadFeeds() {
    for (let data of FEEDS) {
      if (data.designerCity == this.city) this.feeds.push(data);
    }
  }

  filterByCity() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(
      'CityModalPage',
      { data: this.cityArray, city: this.city },
      myModalOptions
    );
    myModal.present();

    myModal.onDidDismiss(data => {
      this.city = data;
      this.designers = [];
      this.feeds = [];
      this.loadDesigners();
      this.loadFeeds();
    });
  }

  ionViewDidLoad() {}
}
