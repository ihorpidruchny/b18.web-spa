import { Component, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CustomerService, BdFormBuilder, BdFormGroup, EnumHelperService, ContactService } from '../../shared';
import {
  Load, Document, Customer,
  DriverRequirements, PowerUnitTypes, TrailerTypes,
  Stop, StopTypes, Contact, Commodity,
  LoadType, FreightType } from '../../models';
import { BdFormButtonComponent } from './common/bd-form-button/bd-form-button.component';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { StopActions } from '../../actions';
import { NgRedux, select } from 'ng2-redux';

@Component(Object.assign({
  selector: 'load-form',
  styleUrls: ['load-form.component.scss'],
  templateUrl: './load-form.component.html'
}, BaseForm.metaData))
export class BdLoadFormComponent extends BaseForm implements OnChanges {
  driverRequirementsNames: Array<any>;
  powerUnitTypesNames: Array<any>;
  trailerTypesNames: Array<any>;
  loadTypesNames: Array<any>;
  freightTypesNames: Array<any>;
  @Input() load: Load;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @select(state => state.stops.items) stops$: Observable<Stop[]>;
  private pickups$: Observable<Stop[]> = this.stops$.map(list => list.filter(stop => stop.type === StopTypes.Pickup));
  private dropoffs$ = this.stops$.map(list => list.filter(stop => stop.type === StopTypes.Dropoff));

  private customerSource: any[];
  private customerQuery: string = '';
  private customerViewMode: ViewMode = ViewMode.None;
  private loadForm: FormGroup;
  private stopTypes = StopTypes;
  private documents: Array<Document>;

  public constructor(
    private stopActions: StopActions,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private enumHelperService: EnumHelperService,
    private contactService: ContactService,
    elementRef: ElementRef) {
    super(elementRef);
    this.driverRequirementsNames = this.enumHelperService.getDropdownKeyValues(DriverRequirements);
    this.powerUnitTypesNames = this.enumHelperService.getDropdownKeyValues(PowerUnitTypes);
    this.trailerTypesNames = this.enumHelperService.getDropdownKeyValues(TrailerTypes);
    this.loadTypesNames = this.enumHelperService.getDropdownKeyValues(LoadType);
    this.freightTypesNames = this.enumHelperService.getDropdownKeyValues(FreightType);
  }

  ngOnChanges(changes: any) {
    if (changes.load) {
      this.initForm();
      this.initCustomerTypeahead(this.load.customer);
    }
  }

  onCustomerRemove() {
    this.load.customer = null;
  }

  onAddNewCustomer() {
    this.load.customer = Customer.create();
    this.customerViewMode = ViewMode.Edit;
  }

  onCustomerSave(customer: Customer) {
    this.load.customer = customer;
    this.customerService.create(customer);
    this.customerViewMode = ViewMode.View;
    this.initCustomerTypeahead(customer);
  }

  onCustomerEditCancel() {
    this.load.customer = this.load.customer;
  }

  public initForm() {
    this.customerViewMode = ViewMode.ViewCollapsed;
    this.loadForm = this.formBuilder.group({
      customer: [this.load.customer, Validators.required],
      addressId: [this.load.addressId],
      billingAddressId: [this.load.billingAddressId],
      contactId: [this.load.contactId],
      driverRequirement: [this.load.driverRequirment],
      powerUnitType: [this.load.powerUnitType],
      trailerType: [this.load.trailerType],
      specialRequirments: [this.load.specialRequirments],
      pickups: this.formBuilder.array([]),
      dropoffs: this.formBuilder.array([]),
      systemLoadNumber: [this.load.systemLoadNumber],
      customerLoadNumber: [this.load.customerLoadNumber],
      type: [this.load.type],
      freightType: [this.load.freightType]
    });
  }

  public onCustomerSelect(customer: Customer) {
   this.load.customer = customer;
   this.customerViewMode = ViewMode.ViewCollapsed;
  }

  private initCustomerTypeahead(customer) {
    this.customerQuery = customer && customer.name;
    this.customerSource = Observable.create((observer: any) => {
      observer.next(this.customerQuery);
    }).mergeMap((token: string) => this.customerService.search(token));
  }

  private onLoadCancel() {
    this.cancel.emit();
  }

  private onLoadSave() {
    if (this.loadForm.valid) {
      let result = this.loadForm.value;
      this.save.emit(this.loadForm.value);
    }
  }

  private onStopAdd(stop: Stop) {
    this.stopActions.add(stop);
  }

  private onStopUpdate(stop: Stop) {
    this.stopActions.update(stop);
  }

  private onStopRemove(stop: Stop) {
    this.stopActions.remove(stop);
  }
}
