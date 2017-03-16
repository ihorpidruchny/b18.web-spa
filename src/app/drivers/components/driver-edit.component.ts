import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Driver } from '../../models';
import { BaseEditComponent } from '../../base';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DriverActions } from '../../actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { DriverForm } from '../../forms';

@Component({
  selector: 'driver-edit',
  templateUrl: './driver-edit.component.html'
})
export class DriverEditComponent extends BaseEditComponent<Driver> {
  @ViewChild(DriverForm) driverFormComponent: DriverForm;

  private anchors = [{
    id: 'driver-personal-information',
    title: 'Personal Info'
  }, {
    id: 'driver-contact',
    title: 'Contact'
  }, {
    id: 'driver-address',
    title: 'Address'
  }, {
    id: 'driver-payment',
    title: 'Payment'
  }, {
    id: 'driver-license',
    title: 'License'
  }];

  constructor(
    private cdr: ChangeDetectorRef,
    private driverActions: DriverActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
      super(driverActions, ngRedux.select(state => state.drivers.selected),
        ngRedux.select(state => state.drivers.isLoading), route, router, location);
  }

  isDetailsChanged() {
    return this.driverFormComponent && this.driverFormComponent.driverForm.dirty;
  }
}
