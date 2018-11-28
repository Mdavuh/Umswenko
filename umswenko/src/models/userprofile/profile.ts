
import { CustPreferences} from './custpreferences';

export interface UserProfile {
  id: string;
  userName: String;
  password: String;
  userType: String;
  loginType: String;
  firstName: String;
  lastName: String;
  gender: String;
  city: String;
  designerName: String;
  preferences: CustPreferences;
  active: boolean;
  registeredDate: Date;
  activatedDate: Date;
  deactivatedDate: Date;
}