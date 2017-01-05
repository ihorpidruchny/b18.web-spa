import { Component, ViewChild } from '@angular/core';
import { BdInputComponent } from './common/bd-input/bd-input.component';
import { BdDropdownComponent } from './common/bd-dropdown/bd-dropdown.component';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { Load } from '../models';
import { LoadStore } from '../stores';
import { LoadService } from '../shared';
import { ViewMode } from '../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseListComponent } from '../base';

@Component({
  selector: 'loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
  providers: [LoadStore]
})
export class LoadsComponent extends BaseListComponent<Load>{
  loadData: string = '1';
  loads: Array<Object>;

  columns = [
    { prop: 'id', name: 'Load #' },
    { prop: 'customer.name', name: 'Customer' },
    { prop: 'status', name: 'Status' }
  ];

  constructor(private loadService: LoadService, loadStore: LoadStore,
    router: Router,
    route: ActivatedRoute) {
    super(loadStore, router, route);
    this.getAll();
  }

  getAll() {
    this.loadService.getAll().subscribe(loads => {
      this.loads = loads;
    });
  }

  onListButtonClick() {
    this.loadData = '2';
    this.router.navigate([this.routePath()]);
  }

  protected routePath(): string {
    return 'loads/';
  }
}
