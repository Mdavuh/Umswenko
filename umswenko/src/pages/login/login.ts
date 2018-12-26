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
import { ProfileDbServiceProvider } from '../../providers/profile-db-service/profile-db-service';
import { UserProfile } from './../../models/userprofile/profile';
import { CustPreferences } from './../../models/userprofile/custpreferences';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    let profile = this.profServ
      .getProfileByUserName('shawn@gmail.com')
      .subscribe(
        x => {
          console.log('Observer got a next value: ' + x);
          if (x) {
            this.userProfiles.push(x);
          } else {
            console.log('Got nothing!');
          }
        },
        err => console.error('Observer got an error: ' + err),
        () => {
          console.log('Observer got a complete notification');
          this.userProfiles.forEach(res => {
            console.log(res);
          });
        }
      );
  }

  createProfile(username: string, userid: string) {
    let data = 'undefined';
    let date = new Date();
    let profileRes = this.profServ.getProfileByUserName(username).subscribe(
      x => {
        console.log('Observer got a next value: ' + x);
        if (x) {
          data = x;
        } else {
          console.log('Got nothing!');
        }
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        console.log('Observer got a complete notification');
        if (data == 'undefined') {
          //create profile
          //set storage

          this.custPreferences = {
            city: 'Durban',
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
            city: 'Durban',
            designerName: 'undefined',
            preferences: this.custPreferences,
            active: true,
            registeredDate: date,
            activatedDate: date,
            deactivatedDate: null
          };

          let newProfile = this.profServ.postProfile(this.profile).subscribe(
            x => {
              console.log('Post Profile observer got a next value: ' + x);               
            },
            err => {
              console.error('Post Profile Observer got an error: ' + err);
            },
            () => {
              console.log('Post Profile Observer got a complete notification');
              this.setLocalStoroge(date, 'Durban');
              this.alertCtrl
                .create({
                  title: 'Sign-In Successful',
                  message: 'Sign-In Successful for new user profile: ' + this.email,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.openPage('HomePage');
                      }
                    }
                  ]
                })
                .present()
            }
          );
          console.log('profile does not exist');
        } else {
          //get profile data
          //set local storage
          this.setLocalStoroge(date, this.email);
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
            .present()
        }
      }
    );
  }

  setLocalStoroge(date: Date, city: string) {
    console.log('Started Storage');
    this.storage.set('name', this.name);
    this.storage.set('email', this.email);
    this.storage.set('last_login_datetime', date);
    this.storage.set('is_logged_in', 'true');
    this.storage.set('city', city);
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
        console.log(user);
        this.loading.dismiss();

        let date = new Date();

        this.openPage('HomePage');
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

            /*this.profile = this.profileService.getUserProfiles();
            console.log('The other profile');
            console.log(this.profile);*/

            /*try {
              let profile = this.profServ.getProfileByUserName(this.email);
              if (this.profServ.getId()) {
                console.log('Old Shit!!!!');
                console.log(this.profServ.getId());
                this.alertCtrl
                  .create({
                    title: 'Sign-In Successful',
                    message: 'Sign-In Successful for ' + this.email,
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
              } else {
                this.profServ.postProfile(this.profile).subscribe(res => {
                  console.log('creating new profile bro!!!!');
                  console.log(res);
                  this.alertCtrl
                    .create({
                      title: 'Sign-In Successful',
                      message: 'Sign-In Successful for ' + this.email,
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
              }
            } catch (e) {}*/
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
      this.navCtrl.setRoot(TabsPage, { filterBy: 'Durban' });
    } else if (page == 'RegisterPage') {
      this.navCtrl.push('RegisterPage');
    }
  }
}
