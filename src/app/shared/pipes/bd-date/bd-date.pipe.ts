import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'bdDate' })
export class BdDatePipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, ...args: any[]): string {
    if (!value || !moment(value).isValid()) return '';
    return momentConstructor(value).format(args[0]);
  }
}
