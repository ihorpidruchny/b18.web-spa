import { Injectable } from '@angular/core';
import { CustomerService } from '../shared';
import { Commodity, Stop } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Todo } from '../Todo';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { chain } from 'lodash';

@Injectable()
export class CommodityStore {

  private _commodities: BehaviorSubject<Array<Commodity>> = new BehaviorSubject(Array<Commodity>());

  constructor(private customerService: CustomerService) {
  }

  set(pickups, dropoffs) {
    const newSource = [...pickups,  ...dropoffs];
    this._commodities.next(newSource);
  }

  public select(commodity: Commodity, stop: Stop) {
    commodity.dropoffId = stop.id;
    this.update(commodity);
  }

  public deselect(commodity: Commodity) {
    commodity.dropoffId = null;
    this.update(commodity);
  }

  public update(changed: Commodity) {
    const newCommodities = this._commodities
      .getValue()
      .map(commodity => (commodity.id === changed.id ? changed : commodity));
    this._commodities.next(newCommodities);
  }

  getPickupCommodities(pickupId: number): Observable<Array<Commodity>> {
    return this._commodities.map(list => list.filter(c => c.pickupId === pickupId));
  }

  getDropoffCommodities(dropoffId: number): Observable<Array<Commodity>> {
    return this._commodities.map(list => list.filter(c => c.dropoffId === dropoffId));
  }

  getAvailableCommodities(): Observable<Array<Commodity>> {
    return this._commodities.map(list => list.filter(c => !c.dropoffId));
  }
}