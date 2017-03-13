import { ContactInfo } from './contact-info';
import { Location } from './location';
import { Type } from 'class-transformer';

export class Contact {
  id: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  @Type(() => ContactInfo)
  contactInfo: Array<ContactInfo>;
  position: string = '';
  locationId: number;
  @Type(() => Location)
  location: Location;

  static create(): Contact{
    const result = new Contact();
    return result;
  }

  constructor() {
    this.contactInfo = new Array<ContactInfo>();
    this.location = Location.create();
  }
};
