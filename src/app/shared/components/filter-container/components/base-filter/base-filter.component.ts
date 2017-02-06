import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { FilterContainer } from '../../filter-container.component';
import { includes, without, some } from 'lodash';
export class BaseFilter {

  public static filterMetaData = {
    inputs: ['defaultLabel', 'valueField', 'selectedItems'],
    host: {'class': 'filter'},
    changeDetection: ChangeDetectionStrategy.OnPush
  };

  @Input() defaultLabel: string;
  @Input() valueField: string;
  @Input() set selectedItems(items: any) {
    this._selectedItems = items || [];
  }

  protected _active: boolean = false;
  private _selectedItems: Array<Object> = [];
  @Input() comparer: Function = (item1, item2) => { return item1['id'] === item2['id']; };

  constructor() {

  }

  get selectedItems() {
    return this._selectedItems;
  }

  public get tagValue() {
    return this.selectedItems.length > 0 ? this._selectedItems.map(item => this.getItemValue(item)).join(', ') : this.defaultLabel;
  }

  public getSelectedItemsValues() {
    this.selectedItems.map(item => this.getItemValue(item));
  }

  protected getItemValue(item: Object) {
    return item[this.valueField];
  }

  protected clearSelection() {
    this.selectedItems = [];
  }

  protected isSelected(checkItem: Object) {
    return includes(this.selectedItems, checkItem);
  }

  protected onSelect(changed: Object) {
    if (!this.isSelected(changed)) {
      this.selectedItems.push(changed);
    } else {
      this.selectedItems = without(this.selectedItems, changed);
    }
  }

  protected onActiveChanged() {

  }

  public get count() {
    return this.selectedItems.length;
  }

  @HostBinding('class.active')
  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
    this.onActiveChanged();
  }
}
