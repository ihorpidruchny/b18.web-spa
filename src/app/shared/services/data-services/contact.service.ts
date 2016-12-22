import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Contact, Address } from './models';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/Delay';
import MockData from './mock-data';

@Injectable()
export class ContactService {

  constructor(private http: Http) {
    this.http = http;
  }

    getContacts(): Observable<Contact[]> {
      return Observable.of(
        MockData.contacts
      );
    }
}
