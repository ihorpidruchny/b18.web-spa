import { Component, Input, ViewChild, forwardRef, Optional, ChangeDetectionStrategy } from '@angular/core';
import { NgbInputDatepicker } from '../datepicker';
import { BdDatePicker } from './components';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
const noop = () => { };

export const BD_FORM_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BdFormDatePicker),
  multi: true
};

@Component({
  selector: 'bd-form-datepicker',
  templateUrl: './bd-form-datepicker.component.html',
  styleUrls: ['bd-form-datepicker.component.scss'],
  providers: [BD_FORM_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class BdFormDatePicker implements ControlValueAccessor {
  @Input() dateFormat: string = 'MM/DD/YYYY';
  @ViewChild('datepicker') datepicker: BdDatePicker;
  private dateValue;

  private value: any;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor() {
  }

  writeValue(value: any) {
    this.value = value;
    this.dateValue = moment(value).format(this.dateFormat);
  }

  onDateChange(value: string) {
    if (value !== this.dateValue) {
      const newDate = moment(value, this.dateFormat);
      this.dateValue = value;
      this.value = newDate ? moment(this.value)
        .year(newDate.year())
        .month(newDate.month())
        .date(newDate.date()).toDate() : null;
    }

  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  onClickOutside() {
    setTimeout(() => {
      this.datepicker.close();
    }, 0);
  }
}
