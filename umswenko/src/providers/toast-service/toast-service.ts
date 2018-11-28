import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class ToastServiceProvider {

  constructor(private toastCtrl: ToastController) {
    
  }

  showToast(message: string, duration){
    this.toastCtrl
      .create({
        message: message,
        duration: duration
      })
      .present();
  }
  
}
