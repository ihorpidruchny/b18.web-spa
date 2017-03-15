import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Driver, DriverTypes, DriverPaymentTypes } from '../../models';
import { BdFormBuilder, BdFormGroup, FormValidationService, GoogleService } from '../../shared';
import { EnumHelperService } from '../../shared/helpers';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component(Object.assign({
  selector: 'driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],
  providers: [FormValidationService]
}, BaseForm.metaData))
export class DriverForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() public scrollable: boolean = true;
  @Input() public submitButtonText: string = 'Save';
  @Input() public driver: Driver;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  driverForm: FormGroup;
  paymentsTypes: Array<any>;
  driverTypes: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private validationService: FormValidationService,
    private googleService: GoogleService,
    private enumHelperService: EnumHelperService,
    elementRef: ElementRef) {
    super(elementRef);

    this.paymentsTypes = enumHelperService.getDropdownKeyValues(DriverPaymentTypes);
    this.driverTypes = enumHelperService.getDropdownKeyValues(Driver.getDriverTypes());
  }

  ngOnChanges(changes: any) {
    if (changes.disabled) {
      this.setFormDisabled(this.disabled);
    }

    if (changes.driver) {
      this.initForm();
    }
  }

  setFormDisabled(isDisabled) {
    if (this.driverForm) {
      if (isDisabled) {
        this.driverForm.disable();
      } else {
        this.driverForm.enable();
      }
    }
  }

  submit(driver: Driver, isValid: boolean) {
    if (!isValid) {
      this.validationService.show();
    }

    if (driver && isValid) {
      this.driverForm.markAsPristine();
      this.save.emit(driver);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  initForm() {
    this.driverForm = this.formBuilder.group({
      id: [this.driver.id],
      firstName: [{value: this.driver.firstName, disabled: this.disabled}],
      lastName: [{value: this.driver.lastName, disabled: this.disabled}],
      type: [{value: this.driver.type, disabled: this.disabled}],
      dateOfBirth: [{value: this.driver.dateOfBirth, disabled: this.disabled}],
      paymentType: [{value: this.driver.paymentType, disabled: this.disabled}],
      ssn: [{value: this.driver.ssn, disabled: this.disabled}],
      rate: [{value: this.driver.rate, disabled: this.disabled}],
      address: this.formBuilder.group({}),
      contactInfo: this.formBuilder.array([]),
      license: this.formBuilder.group({})
    });
  }
}