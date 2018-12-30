import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityModalPage } from './city-modal';

@NgModule({
  declarations: [
    CityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CityModalPage),
  ],
})
export class CityModalPageModule {}
