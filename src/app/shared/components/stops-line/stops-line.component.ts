import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Stop, StopStatuses, StopActionTypes } from '../../../models';

@Component({
  selector: 'stops-line',
  templateUrl: './stops-line.component.html',
  styleUrls: ['./stops-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopsLineComponent {
  @Input() lineColor: string = 'lightGray';
  @Input() stops: Array<Stop>;
  @Output() select: EventEmitter<any> = new EventEmitter();

  onStopSelect(selected) {
    this.select.emit(selected);
  }

  isPickupAndDropOff(stop: Stop) {
    return stop.stopActions && stop.stopActions.filter(a => a.type === StopActionTypes.DROPOFF).length && stop.stopActions.filter(a => a.type === StopActionTypes.PICKUP).length;
  }

  isDropOff(stop: Stop) {
    return stop.stopActions && stop.stopActions.filter(a => a.type === StopActionTypes.DROPOFF).length;
  }

  getColor(stopStatus: StopStatuses) {
    return StopStatuses.color(stopStatus);
  }
}
