import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  account = {} as Account;

  constructor(private afAuth: AngularFireAuth,
              private navCtrl: NavController, 
              private navParams: NavParams,
              private toast: ToastController,
              private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
  }
  
  navigateToPage(pageName: string){
    this.navCtrl.push(pageName);
  }

  async login(){
    try {
      this.account.email = this.loginForm.get('email').value;
      this.account.password = this.loginForm.get('password').value;
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email,
      this.account.password);
      this.toast
        .create({ message: "Account Authentication Successful", duration: 3000 })
        .present();
        this.navigateToPage('HomePage');
    
    }
    catch(e){
      console.error(e);
      this.toast
        .create({ message: e.message, duration: 3000 })
        .present();
    }
  }

}
