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
import { ProfileDbServiceProvider } from '../../providers/profile-db-service/profile-db-service';
import { UserProfile } from './../../models/userprofile/profile';
import { CustPreferences } from './../../models/userprofile/custpreferences';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  cityArray: any = [];
  city: string;
  name: string = '';
  email: string = '';
  password: string = '';
  loginForm: FormGroup;
  loading: any;
  user: any = {};
  userProfiles: any[] = [];
  custPreferences: CustPreferences;
  profile: UserProfile;
  firstName: string = '';
  lastName: string = '';
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

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {}

  createProfile(username: string, userid: string) {
    let data = 'undefined';
    let date = new Date();
    let profileRes = this.profServ.getProfileByUserName(username).subscribe(
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
        console.log('Observer got a complete notification');
        if (data == 'undefined') {
          //create profile
          //set storage

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
              loginType: 'gmail',
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

            let newProfile = this.profServ.postProfile(this.profile).subscribe(
              x => {
                console.log('Post Profile observer got a next value: ' + x);
              },
              err => {
                console.error('Post Profile Observer got an error: ' + err);
                this.toastServ.showToast(err.message, 3000);
              },
              () => {
                console.log(
                  'Post Profile Observer got a complete notification'
                );
                this.setLocalStoroge(date, this.profile.loginType);
                this.alertCtrl
                  .create({
                    title: 'Sign-In Successful',
                    message:
                      'Sign-In Successful for new user profile: ' + this.email,
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
              }
            );
            console.log('profile does not exist');
          });
        } else {
          //get profile data
          //set local storage
          this.firstName = this.profileData.firstName;
          this.lastName = this.profileData.lastName;
          this.name = this.profileData.firstName + ' ' + this.lastName;
          this.city = this.profileData.city;
          this.setLocalStoroge(date, this.profileData.loginType);
          console.log('profile exists!!!');
          console.log(data);
          this.alertCtrl
            .create({
              title: 'Sign-In Successful',
              message: 'Sign-In Successful for user profile: ' + this.email,
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
        }
      }
    );
  }

  setLocalStoroge(date: Date, loginType: string) {
    console.log('Started Storage');
    this.storage.set('name', this.name);
    this.storage.set('email', this.email);
    this.storage.set('last_login_datetime', date);
    this.storage.set('is_logged_in', 'true');
    this.storage.set('city', this.city);
    this.storage.set('login_type', loginType);
    console.log('Finished Storage');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.email = this.email = this.loginForm.controls['email'].value;
      this.password = this.loginForm.controls['password'].value;
      this.signin();
    } else {
      return;
    }
  }

  signin() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.loading.dismiss();
        let date = new Date();
        let data;
  
        this.storage
          .get('email')
          .then(val => {
            if (val == this.email) {
              this.storage.set('last_login_datetime', date);
              this.storage.set('is_logged_in', 'true');
              this.storage.get('name').then(val => {
                this.name = val;
                this.openPage('HomePage');
              }).catch(err => {
                this.toastServ.showToast(err.message, 3000);
              });              
            }else{
              let profileRes = this.profServ
                .getProfileByUserName(this.email)
                .subscribe(
                  x => {
                    console.log('Observer got a next value: ' + x);
                    if (x) {
                      data = x;
                    } else {
                      console.log('Got nothing!');
                      this.toastServ.showToast('Could not retrieve user profile.', 3000);
                    }
                  },
                  err => {
                    console.error('Observer got an error: ' + err);
                    this.toastServ.showToast(err.message, 3000);
                  },
                  () => {
                    console.log('got profile data');
                    this.firstName = data.firstName;
                    this.lastName = data.lastName;
                    this.name = this.firstName + " " + this.lastName;
                    this.city = data.city;
                    this.setLocalStoroge(date, data.loginType);
                    this.openPage('HomePage');
                  }
                );
            }
            
          }).catch(err => {
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
            let userid = suc.uid;

            console.log('userid: ' + userid);
            console.log('creating the profile');
            this.createProfile(this.email, userid);
            console.log('completed creating profile!!!');
          }).catch(err =>{
            this.toastServ.showToast(err.message, 3000);
          });
      })
      .catch(err => {
        this.toastServ.showToast(err.message, 3000);
      });
  }

  openPage(page: string) {
    if (page == 'LoginPage') {
      this.navCtrl.push('LoginPage');
    } else if (page == 'HomePage') {
      this.toastServ.showToast('Welcome ' + this.name, 3000);
      this.navCtrl.setRoot(TabsPage, { authinfo: true });
    } else if (page == 'RegisterPage') {
      this.navCtrl.push('RegisterPage');
    }
  }
}
