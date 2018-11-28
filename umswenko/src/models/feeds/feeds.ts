import { Images } from './images';
import { UserProfile } from '../userprofile/profile';

export interface Feed {
  Id: String;
  designer: UserProfile;
  images: Images;
  message: String;
  createdDate: Date;
}