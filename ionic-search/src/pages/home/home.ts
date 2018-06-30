import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: string[];
  errorMessage: string;

  descending: boolean = false;
  order: number;
  column: string = 'name';

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  constructor(public navCtrl: NavController, public rest: RestApiProvider) {

  }

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    this.getCountries();
  }

}
