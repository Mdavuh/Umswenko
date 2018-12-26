import { Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProfile } from '../../models/userprofile/profile';

@Injectable()
export class ProfileServiceProvider {
  private profileRef = this.db.list<UserProfile>('user-profile');
  profiles;

  constructor(private db: AngularFireDatabase) {}

  getUserProfiles() {
    return this.profileRef.valueChanges().subscribe( data => {
      console.log(data);
      this.profiles = data;
    },(err)=>{
      console.log('error' + err)
    })
  }



  getUserProfile() {

   this.profiles = this.db.list('/user-profile', ref => ref.orderByChild('userName').equalTo('mngaditcd@gmail.com'))
      .valueChanges().subscribe(data => {
        console.log(data);
      }, (err) => {
        console.log('error' + err)
      }  
    )

    console.log(this.profiles);
  }

  addUserProfile(profile: UserProfile) {
    return this.profileRef.push(profile);
  }

  updateUserProfile(profile: UserProfile) {
    return this.profileRef.update(profile.key, profile);
  }

  removeUserProfile(profile: UserProfile) {
    return this.profileRef.remove(profile.key);
  }

}
