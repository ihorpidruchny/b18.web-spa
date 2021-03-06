import { Component, Input } from '@angular/core';

const DEFAULT_INITIALS = 'B18';

@Component({
  selector: 'bd-circle',
  styleUrls: ['./bd-circle.component.scss'],
  templateUrl: './bd-circle.component.html'
})
export class BdCircleComponent {

      @Input() initials: string = '';
      @Input() private size: 'default' | 'small' = 'default';

      get dataInitials(){
        if (!this.initials) return DEFAULT_INITIALS;
        return this.initials;
      }
}
