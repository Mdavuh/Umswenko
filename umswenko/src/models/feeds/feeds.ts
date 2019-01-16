import { Images } from './images';

export interface Feed {
  Id: string;
  designer: string;
  designerFirstName: string;
  designerLastName: string;
  images: [{id:string, imageUrl:string}];
  message: string;
  createdDate: Date;
}