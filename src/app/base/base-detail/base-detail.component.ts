import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IDetailDataActions } from '../../actions';
import { ViewMode } from '../../shared/enums';
import { cloneDeep, merge } from 'lodash';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../guards';
import { Location } from '@angular/common';

export abstract class BaseDetailComponent<T> {
  protected selectedItem: T = null;

  constructor(private actions: IDetailDataActions<T>,
    private selected$: Observable<T>,
    protected router: Router,
    private route: ActivatedRoute) {
    selected$.subscribe(item => {
      this.selectedItem = cloneDeep(item);
    });
    this.route.params.subscribe(params => {
      this.onQueryParams(params);
    });
  }

  private onEdit() {
    this.navigateToEdit();
  }

  private navigateToEdit() {
    this.router.navigate(['./edit'],  {preserveQueryParams: true, relativeTo: this.route});
  }
  
  private onQueryParams(params) {
    const id = Number.parseInt(params['id']);
    if (!isNaN(id) && id > 0) {
      this.actions.select(id);
    }
  }
}
