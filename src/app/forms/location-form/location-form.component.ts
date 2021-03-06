import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '../../models';
import { ViewMode } from '../../shared/enums';
import { BaseForm } from '../base-form';

@Component(Object.assign({
  selector: 'location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
}, BaseForm.metaData))
export class LocationForm extends BaseForm {
  @Input() disabled: boolean = false;
  @Input() viewMode: ViewMode = ViewMode.View;
  @Input() location: Location;
  @Input('group') locationForm: FormGroup;
  @Output() update = new EventEmitter();

  constructor(private formBuilder: FormBuilder, elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnChanges(changes: any) {
    if (changes.location || changes.locationForm) {
      this.initForm();
    }
  }

  initForm() {
    this.locationForm.setControl('id', this.formBuilder.control(
      this.location.id, []
    ));
    this.locationForm.setControl('name', this.formBuilder.control(
      {value: this.location.name, disabled: this.disabled}, []
    ));
    this.locationForm.setControl('address', this.formBuilder.group({ }));
    this.locationForm.setControl('contactInfo', this.formBuilder.array([]));
    this.locationForm.valueChanges.subscribe((value) => {
      if (this.locationForm.valid && this.locationForm.dirty) {
        this.update.emit(value);
      }
    });
  }
}
