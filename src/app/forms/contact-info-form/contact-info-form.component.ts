import { Component, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactInfo } from '../../models';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['../../../assets/styles/form-control.scss']
}, BaseForm.metaData))
export class ContactInfoForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input()
  public contactInfo: ContactInfo;
  @Input('group')
  public contactInfoForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder, elementRef: ElementRef){
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    this.initForm();
  }

  initForm() {
    const keys = Object.keys(this.contactInfo);

    keys.forEach(key => {
      this.contactInfoForm.addControl(
        key, this._formBuilder.control({value: this.contactInfo[key], disabled: this.disabled}, [])
      );
    });
  }

  get generateClass() {
    return this.contactInfo.label.toLowerCase().replace(' ', '-');
  }
}
