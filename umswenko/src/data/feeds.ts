import { IMAGES } from './images';
//import { Feed } from '../models/feeds/feeds';
import { DESIGNERS } from '../data/designers';

export const FEEDS: any[] = [
  {
    Id: '100',
    designer: DESIGNERS[0].designerName,
    designerFirstName: DESIGNERS[0].firstName,
    designerLastName: DESIGNERS[0].lastName,
    designerCity: DESIGNERS[0].city,
    designerImageUrl: DESIGNERS[0].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[0].imageUrl },
      { id: '2', imageUrl: IMAGES[1].imageUrl },
      { id: '3', imageUrl: IMAGES[2].imageUrl }
    ],
    message: 'Summer Edition',
    createdDate: new Date('2018-10-25')
  },
  {
    Id: '101',
    designer: DESIGNERS[1].designerName,
    designerFirstName: DESIGNERS[1].firstName,
    designerLastName: DESIGNERS[1].lastName,
    designerCity: DESIGNERS[1].city,
    designerImageUrl: DESIGNERS[1].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[3].imageUrl },
      { id: '2', imageUrl: IMAGES[4].imageUrl },
      { id: '3', imageUrl: IMAGES[5].imageUrl }
    ],
    message: 'African Wedding Delights',
    createdDate: new Date('2018-10-26')
  },
  {
    Id: '102',
    designer: DESIGNERS[2].designerName,
    designerFirstName: DESIGNERS[2].firstName,
    designerLastName: DESIGNERS[2].lastName,
    designerCity: DESIGNERS[2].city,
    designerImageUrl: DESIGNERS[2].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[6].imageUrl },
      { id: '2', imageUrl: IMAGES[7].imageUrl },
      { id: '3', imageUrl: IMAGES[8].imageUrl }
    ],
    message: 'Colourful Sunrise',
    createdDate: new Date('2018-10-27')
  },
  {
    Id: '103',
    designer: DESIGNERS[3].designerName,
    designerFirstName: DESIGNERS[3].firstName,
    designerLastName: DESIGNERS[3].lastName,
    designerCity: DESIGNERS[3].city,
    designerImageUrl: DESIGNERS[3].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[9].imageUrl },
      { id: '2', imageUrl: IMAGES[10].imageUrl },
      { id: '3', imageUrl: IMAGES[11].imageUrl }
    ],
    message: 'Umembeso to Remember',
    createdDate: new Date('2018-10-28')
  },
  {
    Id: '104',
    designer: DESIGNERS[4].designerName,
    designerFirstName: DESIGNERS[4].firstName,
    designerLastName: DESIGNERS[4].lastName,
    designerCity: DESIGNERS[4].city,
    designerImageUrl: DESIGNERS[4].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[12].imageUrl },
      { id: '2', imageUrl: IMAGES[13].imageUrl },
      { id: '3', imageUrl: IMAGES[14].imageUrl }
    ],
    message: 'Fashion Fabolous Month',
    createdDate: new Date('2018-10-29')
  },
  {
    Id: '105',
    designer: DESIGNERS[5].designerName,
    designerFirstName: DESIGNERS[5].firstName,
    designerLastName: DESIGNERS[5].lastName,
    designerCity: DESIGNERS[5].city,
    designerImageUrl: DESIGNERS[5].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[15].imageUrl },
      { id: '2', imageUrl: IMAGES[16].imageUrl },
      { id: '3', imageUrl: IMAGES[17].imageUrl },
      { id: '4', imageUrl: IMAGES[18].imageUrl }
    ],
    message: 'Durban July Vibes',
    createdDate: new Date('2018-11-15')
  },
  {
    Id: '106',
    designer: DESIGNERS[6].designerName,
    designerFirstName: DESIGNERS[6].firstName,
    designerLastName: DESIGNERS[6].lastName,
    designerCity: DESIGNERS[6].city,
    designerImageUrl: DESIGNERS[6].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[19].imageUrl },
      { id: '2', imageUrl: IMAGES[1].imageUrl },
      { id: '3', imageUrl: IMAGES[2].imageUrl },
      { id: '4', imageUrl: IMAGES[3].imageUrl }
    ],
    message: 'Winter Edition 2019',
    createdDate: new Date('2018-11-16')
  },
  {
    Id: '107',
    designer: DESIGNERS[7].designerName,
    designerFirstName: DESIGNERS[7].firstName,
    designerLastName: DESIGNERS[7].lastName,
    designerCity: DESIGNERS[7].city,
    designerImageUrl: DESIGNERS[7].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[4].imageUrl },
      { id: '2', imageUrl: IMAGES[5].imageUrl },
      { id: '3', imageUrl: IMAGES[6].imageUrl },
      { id: '4', imageUrl: IMAGES[7].imageUrl }
    ],
    message: 'Summer Fabolous Show',
    createdDate: new Date('2018-11-18')
  },
  {
    Id: '108',
    designer: DESIGNERS[8].designerName,
    designerFirstName: DESIGNERS[8].firstName,
    designerLastName: DESIGNERS[8].lastName,
    designerCity: DESIGNERS[8].city,
    designerImageUrl: DESIGNERS[8].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[8].imageUrl },
      { id: '2', imageUrl: IMAGES[9].imageUrl },
      { id: '3', imageUrl: IMAGES[10].imageUrl },
      { id: '4', imageUrl: IMAGES[11].imageUrl },
      { id: '5', imageUrl: IMAGES[12].imageUrl }
    ],
    message: 'Summer Fabolous Show',
    createdDate: new Date('2018-11-18')
  },
  {
    Id: '109',
    designer: DESIGNERS[9].designerName,
    designerFirstName: DESIGNERS[9].firstName,
    designerLastName: DESIGNERS[9].lastName,
    designerCity: DESIGNERS[9].city,
    designerImageUrl: DESIGNERS[9].imageUrl,
    images: [
      { id: '1', imageUrl: IMAGES[13].imageUrl },
      { id: '2', imageUrl: IMAGES[14].imageUrl },
      { id: '3', imageUrl: IMAGES[15].imageUrl },
      { id: '4', imageUrl: IMAGES[16].imageUrl },
      { id: '5', imageUrl: IMAGES[17].imageUrl }
    ],
    message: 'Autumn Style 2019 Edition',
    createdDate: new Date('2018-11-20')
  },
];
