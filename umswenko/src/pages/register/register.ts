import { UserProfile } from './../../models/userprofile/profile';
import { CustPreferences } from './../../models/userprofile/custpreferences';
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
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { stringify } from '@angular/compiler/src/util';
import { ProfileDbServiceProvider } from '../../providers/profile-db-service/profile-db-service';

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
  custPreferences: CustPreferences;
  profile: UserProfile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastServ: ToastServiceProvider,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private googlePlus: GooglePlus,
    private http: HttpClient,
    private storage: Storage,
    private profileService: ProfileServiceProvider,
    private profServ: ProfileDbServiceProvider
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
            this.setLocalStoroge();
            this.createProfile(newUser.uid, 'email');
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
          this.firstName = res.givenName;
          this.lastName = res.familyName;

          firebase
            .auth()
            .signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(res.idToken)
            )
            .then(suc => {
              this.setLocalStoroge();
              this.createProfile(suc.uid, 'google');
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

  setLocalStoroge() {
    console.log('Started Storage');
    let date = new Date();
    this.storage.set('name', this.name);
    this.storage.set('email', this.email);
    this.storage.set('last_login_datetime', date.toString());
    this.storage.set('is_logged_in', 'true');
    this.storage.set('city', this.city);
    console.log('Finished Storage');
  }

  createProfile(userid: any, loginType: string) {
    let message: string;
    let title: string;

    let date = new Date();

    console.log('Started Profile');
    console.log('userid: ' + userid);
    console.log('loginType: ' + loginType);

    this.custPreferences = {
      city: this.city,
      gender: 'undefined',
      outfit_type: 'undefined',
      occasion: 'undefined'
    };

    this.profile = {
      userid: userid,
      userName: this.email,
      password: this.password,
      userType: 'customer',
      loginType: loginType,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: 'undefined',
      city: this.city,
      designerName: 'undefined',
      preferences: this.custPreferences,
      active: true,
      registeredDate: date,
      activatedDate: date,
      deactivatedDate: null
    };

    if (loginType == 'email') {
      title = 'Account Created';
      message = 'Your account has been created successfully.';
    } else {
      title = 'Sign-Up Successful';
      message = 'Sign - Up Successful for ' + this.email;
    }

    console.log('titlel: ' + title);
    console.log('titlel: ' + message);   

    this.profServ.postProfile(this.profile).subscribe(
      res => {
        this.alertCtrl
          .create({
            title: title,
            message: message,
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
      },
      err => {
        console.log(err);
      }
    );
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
