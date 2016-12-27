import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Commodity } from '../../../models';
import { BaseCommodityFormComponent } from '../base-commodity-form';
import { BaseForm } from '../../base-form';

@Component(Object.assign({
  selector: 'drop-off-commodity-form',
  templateUrl: './drop-off-commodity-form.component.html',
  styleUrls: [
    './drop-off-commodity-form.component.scss'
  ]
}, BaseForm.metaData))
export class DropOffCommodityFormComponent extends BaseForm {
  @Input() formArray: FormArray;
  @Input() commodities: Array<Commodity>;
  @Input() availablePickups: Array<Commodity> = new Array<Commodity>();
  @Output() select: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @Output() change: EventEmitter<Commodity> = new EventEmitter<Commodity>();
  @ViewChild('commodityForm') commodityFormElement: BaseCommodityFormComponent;

  private showPickups: boolean = false;
  onShowPickups() {
    this.showPickups = true;
  }

  pickupSelect(commodity: Commodity) {
    this.showPickups = false;
    this.select.emit(commodity);
    this.commodityFormElement.addCommodity(commodity);
  }

  onChange(commodity: Commodity) {
    this.change.emit(commodity);
  }
}