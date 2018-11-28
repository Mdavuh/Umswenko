import { Feed } from '../models/feeds/feeds';
import { DESIGNERS } from '../data/designers';
import { IMAGES } from '../data/images'

export const FEEDS: Feed[] = [
  {
    Id: '100',
    designer: DESIGNERS[0],
    images: IMAGES[0],
    message: 'SUMMER BREEZE',
    createdDate: new Date("2018-10-25")
  },
  {
    Id: '101',
    designer: DESIGNERS[1],
    images: IMAGES[1],
    message: 'WEDDING VIBES',
    createdDate: new Date("2018-10-25")
  },
  {
    Id: '102',
    designer: DESIGNERS[2],
    images: IMAGES[2],
    message: 'UMEMBESO IS HERE',
    createdDate: new Date("2018-10-26")
  },
  {
    Id: '103',
    designer: DESIGNERS[3],
    images: IMAGES[3],
    message: 'DELIGHTFUL SUMMER',
    createdDate: new Date("2018-10-26")
  },
  {
    Id: '104',
    designer: DESIGNERS[4],
    images: IMAGES[4],
    message: 'SUMMER SUNSHINE',
    createdDate: new Date("2018-10-27")
  },
  {
    Id: '105',
    designer: DESIGNERS[5],
    images: IMAGES[5],
    message: 'WEDDING TIME',
    createdDate: new Date("2018-10-27")
  },
  {
    Id: '106',
    designer: DESIGNERS[6],
    images: IMAGES[6],
    message: 'DELIGHTFUL SUMMER',
    createdDate: new Date("2018-10-28")
  },
  {
    Id: '107',
    designer: DESIGNERS[7],
    images: IMAGES[7],
    message: 'SUMMER SUNSHINE',
    createdDate: new Date("2018-10-28")
  },
  {
    Id: '108',
    designer: DESIGNERS[8],
    images: IMAGES[8],
    message: 'WEDDING TIME',
    createdDate: new Date("2018-10-29")
  },
  {
    Id: '109',
    designer: DESIGNERS[9],
    images: IMAGES[9],
    message: 'AFRICANISM',
    createdDate: new Date("2018-10-29")
  }
];
