import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { CITIES } from '../../constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { HttpClient } from '@angular/common/http';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { Storage } from '@ionic/storage';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  cityArray: any = [];
  city: string;
  firstName: string = '';
  lastName: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  registerForm: FormGroup;
  loading: any;
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastServ: ToastServiceProvider,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private googlePlus: GooglePlus,
    private http: HttpClient,
    private storage: Storage
  ) {
    for (let c of CITIES) {
      this.cityArray.push(c);
    }

    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.firstName = this.registerForm.controls['firstname'].value;
      this.lastName = this.registerForm.controls['lastname'].value;
      this.email = this.email = this.registerForm.controls['email'].value;
      this.password = this.registerForm.controls['password'].value;
      this.city = this.registerForm.controls['city'].value;
      this.signup('email');
    } else {
      return;
    }
  }

  signup(signinType: string) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    if (signinType == 'email') {
      this.name = this.firstName + ' ' + this.lastName;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        let newUser: firebase.User = data.user;
        newUser
          .updateProfile({
            displayName: this.name,
            photoURL: ''
          })
          .then(res => {
            this.loading.dismiss();

            let date = new Date();            

            this.storage.set('name',  this.name);
            this.storage.set('email', this.email);
            this.storage.set('last_login_datetime', date.toString() );
            this.storage.set('is_logged_in','true');     
            this.storage.set('city',this.city);     

            console.log('Profile Updated');

            this.alertCtrl
              .create({
                title: 'Account Created',
                message: 'Your account has been created successfully.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.openPage('HomePage');
                    }
                  }
                ]
              })
              .present();
          })
          .catch(err => {
            console.log(err);
            this.loading.dismiss();
            this.toastServ.showToast(err.message, 3000);
          });
      })
      .catch(err => {
        console.log(err);
        this.loading.dismiss();
        this.toastServ.showToast(err.message, 3000);
      });
  }

  loginGoogle() {
    this.city = this.registerForm.controls['city'].value;

    if (this.city) {
      this.googlePlus
        .login({
          webClientId:
            '60722354259-3n9n6fjep642uncp6u3m051b5tb566f5.apps.googleusercontent.com',
          offline: true
        })
        .then(res => {
          console.log(res);
          this.name = res.displayName;
          this.email = res.email;
          firebase
            .auth()
            .signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(res.idToken)
            )
            .then(suc => {
              this.alertCtrl
                .create({
                  title: 'Sign-Up Successful',
                  message: 'Sign-Up Successful for ' + this.email,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.openPage('HomePage');
                      }
                    }
                  ]
                })
                .present();
            });
        })
        .catch(err => {
          this.toastServ.showToast(err.message, 3000);
        });
    } else {
      this.toastServ.showToast('Please select a City', 3000);
    }
  }

  getData() {
    let token = this.user.token;
    this.http.get('');
  }

  openPage(page: string) {
    if (page == 'LoginPage') {
      this.navCtrl.push('LoginPage');
    } else if (page == 'HomePage') {
      this.toastServ.showToast('Welcome ' + this.name, 3000);
      this.navCtrl.setRoot(TabsPage, { filterBy: this.city });
    } else if (page == 'RegisterPage') {
      this.navCtrl.push('RegisterPage');
    }
  }
}
