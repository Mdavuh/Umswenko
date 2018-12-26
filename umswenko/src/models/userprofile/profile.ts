
import { CustPreferences} from './custpreferences';

export interface UserProfile {
  key?: string;
  userid: string;
  userName: string;
  password: string;
  userType: string;
  loginType: string;
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  designerName: string;
  preferences: CustPreferences;
  active: boolean;
  registeredDate: Date;
  activatedDate: Date;
  deactivatedDate: Date;
}