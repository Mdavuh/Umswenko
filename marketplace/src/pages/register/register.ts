import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import {ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  account = {} as Account;

  constructor(
    private toast: ToastController,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  async register() {
    try {
      this.account.email = this.registerForm.get('email').value;
      this.account.password = this.registerForm.get('password').value;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.account.email,
        this.account.password
      );
      this.toast
        .create({
          message: 'Account successfully created.',
          duration: 3000
        })
        .present();
      this.navigateToPage('HomePage');
    } catch (e) {
      console.error(e);
      this.toast
        .create({
          message: e.message,
          duration: 3000
        })
        .present();
    }
  }
}
