import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    AngularFireAuthModule
  ],
})
export class LoginPageModule {}
