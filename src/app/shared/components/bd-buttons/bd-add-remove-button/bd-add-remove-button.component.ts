import { Component, Input } from '@angular/core';

@Component({
  selector: 'bd-add-remove-button',
  styleUrls: ['./bd-add-remove-button.component.scss'],
  templateUrl: './bd-add-remove-button.component.html'
})
export class BdAddRemoveButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() prefixLabel: string = '';
  @Input() suffixLabel: string = '';

  protected iconClass: string = '';
}
