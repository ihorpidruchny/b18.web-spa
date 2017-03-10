import { Address } from './index';
import { ContactInfoType } from './enums';

const contactInfoTypes = createInfoTypes();

function createInfoTypes() {
  let result = {};
    result[ContactInfoType.None] = 'None';
    result[ContactInfoType.Phone] = 'Phone';
    result[ContactInfoType.Fax] = 'Fax';
    result[ContactInfoType.Email] = 'Email';
  return result;
}

export class ContactInfo {
  label: string = '';
  value: string = '';
  type: ContactInfoType;

  public static getPrimaryPhone(contactInfoList: Array<ContactInfo>): string {
    const info = contactInfoList.filter(item => {
      return item.label === 'primaryPhone';
    });

    return info.length ? info[0].value : '';
  }

  public static getContactInfoType(type: ContactInfoType): string {
    return contactInfoTypes[type];
  }
}
