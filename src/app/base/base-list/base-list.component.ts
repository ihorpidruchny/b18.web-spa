import { Component, ViewChild } from '@angular/core';
import { Load } from '../models';
import { IListDataStore } from '../../stores';
import { ViewMode } from '../../shared/enums';
import { cloneDeep } from 'lodash';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

export abstract class BaseListComponent<T> {
  @ViewChild('datatable') datatable;
  protected items: T[] = new Array<T>();

  private childRouteSubscription: any;
  private childRoute: any;

  constructor(private store: IListDataStore<T>,
    protected router: Router, protected route: ActivatedRoute) {
    store.getAll();
  }

  ngAfterViewInit() {
    this.store.items().subscribe((items) => {
      this.items = items;
      this.subscribeToDetailsChildRoute();
    });
  }

  protected onAdd() {
    this.deselectRow();
    this.navigateToDetails(0);
  }

  protected abstract routePath(): string;

  private onSelect(event: any) {
    const item: T = event.selected[0];
    this.navigateToDetails(item['id']);
  }

  private navigateToDetails(id: number) {
    this.router.navigate([this.routePath(), id],  {preserveQueryParams: true});
  }

  private deselectRow() {
    this.datatable.selected = [];
  }

  private selectRow(id: number) {
    this.datatable.selected = this.items.filter(item => item['id'] === id);
  }


  private subscribeToDetailsChildRoute() {
    // child route subscribtion approach taken from https://github.com/angular/angular/issues/11692
    this.router.events.subscribe(e => {
      const route = this.route.firstChild;
      if (e instanceof NavigationEnd && this.childRoute !== this.route.firstChild) {
        if (this.childRouteSubscription) {
          this.childRouteSubscription.unsubscribe();
        }
        this.childRoute = this.route.firstChild;
        if (this.childRoute) {
          this.childRouteSubscription = this.childRoute
            .params
            .subscribe(this.onDetailRouteChange.bind(this));
        }
        else {
          this.onDetailRouteChange({});
        }
      }
    });
  }

  private onDetailRouteChange(params: any) {
    const id = Number.parseInt(params['id']);
    if (!isNaN(id)) {
      this.selectRow(id);
    }
  }
}
