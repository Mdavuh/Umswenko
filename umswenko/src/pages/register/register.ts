import { UserProfile } from './../../models/userprofile/profile';
import { CustPreferences } from './../../models/userprofile/custpreferences';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController,
  Modal,
  ModalController,
  ModalOptions
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
import { stringify } from '@angular/compiler/src/util';
import { ProfileDbServiceProvider } from '../../providers/profile-db-service/profile-db-service';
import * as firebaseAuth from 'firebase/auth';

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
  firebaseDb: firebaseAuth;
  profileData: any;

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
    private profServ: ProfileDbServiceProvider,
    private modal: ModalController
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

    this.firebaseDb = firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        let newUser: firebase.User = data.user;     
        newUser
          .updateProfile({ displayName: this.name, photoURL: '' })
          .then(res => {
            this.loading.dismiss();
            this.setLocalStoroge('email');
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
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(
      'CityModalPage',
      { data: this.cityArray },
      myModalOptions
    );
    myModal.present();

    myModal.onDidDismiss(data => {
      console.log('I have dismissed');
      console.log(data);
      this.city = data;
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

          this.firebaseDb = firebase
            .auth()
            .signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(res.idToken)
            )
            .then(suc => {
              this.setLocalStoroge('gmail');
              this.createProfile(suc.uid, 'google');
            });
        })
        .catch(err => {
          this.toastServ.showToast(err.message, 3000);
        });
    });
  }
 

  setLocalStoroge(loginType: string) {
    console.log('Started Storage');
    let date = new Date();
    this.storage.set('name', this.name);
    this.storage.set('email', this.email);
    this.storage.set('last_login_datetime', date.toString());
    this.storage.set('is_logged_in', 'true');
    this.storage.set('city', this.city);
    this.storage.set('login_type', loginType);
  }

  createProfile(userid: any, loginType: string) {
    let message: string;
    let title: string;

    let date = new Date();
    let data = 'undefined';

    let profileRes = this.profServ.getProfileByUserName(this.email).subscribe(
      x => {
        console.log('Observer got a next value: ' + x);
        if (x) {
          data = x;
          this.profileData = x;
        } else {
          console.log('Got nothing!');
          console.log(x);
        }
      },
      err => {
        console.error('Observer got an error: ' + err);
        this.toastServ.showToast(err.message, 3000);
      },
      () => {

        if (data == 'undefined') {
          //create profile
          //set storage
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
            deactivatedDate: null,
            imageUrl: null
          };

          if (loginType == 'email') {
            title = 'Account Created';
            message = 'Your account has been created successfully.';
          } else {
            title = 'Sign-Up Successful';
            message = 'Sign - Up Successful for ' + this.email;
          }

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
              this.toastServ.showToast(err.message, 3000);
            }
          );

        }else{
          this.toastServ.showToast('Profile already exists, please Sign-In',3000);
          this.googlePlus.disconnect().then(res => {
            console.log('Sign Out!!');
            console.log(res);
          })
        }  
     });
  }

  openPage(page: string) {
    console.log('inside firebase: 1');
    this.firebaseDb = firebase.auth.EmailAuthProvider_Instance;
    console.log(this.firebaseDb);
    if (page == 'LoginPage') {
      this.navCtrl.push('LoginPage');
    } else if (page == 'HomePage') {
      this.toastServ.showToast('Welcome ' + this.name, 3000);
      let data = {
        authinfo: true,
        city: this.city
      }
      this.navCtrl.setRoot(TabsPage, { data });
      
    } else if (page == 'RegisterPage') {
      this.navCtrl.push('RegisterPage');
    }
  }
}
