import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BdMessageCardComponent, BdTaskCardComponent } from './notification-cards';
import { BdPopoverContent } from './directives/bd-popover';
import { Notification, NotificationType } from '../../../models';
import { forEach, includes } from 'lodash';

@Component({
  selector: 'bd-notification-popover',
  templateUrl: './bd-notification-popover.component.html',
  styleUrls: ['./bd-notification-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BdNotificationPopoverComponent {

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() showAll: EventEmitter<any> = new EventEmitter();

  @Input() width: number;
  @Input() items: Array<Notification> = [];

  @Input() set notificationType(type: NotificationType) {
    this.setNotificationsVariables(type);
  }
  @Input() private _maxStack: number = 5;

  private notificationTypeEnum = NotificationType;
  private _items: Array<Notification> = [];
  private _iconClass: string;
  private _titleText: string;
  private _topIconActive: boolean = false;
  private _itemsName: string = '';
  private _notificationType: NotificationType;
  private _notifications: Array<Notification> = [];
  private _itemsCount: number = 0;

  set topIconClassName(val: string) {
    this._iconClass = 'icon-' + val + 's';
  }

  set titleText(val: string) {
    this._titleText = 'Latest ' + val + 's';
  }

  set itemsName(val: string) {
    if (this._itemsCount > 1) this._itemsName = val + 's';
    else this._itemsName = val;
    this._cdr.markForCheck();
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnChanges(changes) {
    if (changes.items) {
      this.items.map(item => {
        if (includes(this._items, item)) return;
        this._items.unshift(item);
      });
      this._notifications = this._items.filter(n => n.type === this._notificationType);
      this._itemsCount += this._notifications.length;
      this._notifications = this._notifications.slice(0, this._maxStack);
      this.setNotificationsVariables(this._notificationType);
    }
}

setNotificationsAsViewed(): Array <Notification> {
  return forEach(this._notifications, (item) => {
    item.isViewed = true;
  });
}

setNotificationsVariables(val: NotificationType) {
  const typeText = Notification.getTypeText(val);
  this.topIconClassName = this.itemsName = this.titleText = typeText;
  this._notificationType = val;
}

onRefreshClick(event) {
  this.refresh.emit({
    action: 'refresh'
  });
}

onShowAllClick(){
  this.showAll.emit({
    action: 'showAll'
  });
}

resetNewNotificationsCount() {
  this._itemsCount = 0;
}

handleOnShownEvent(event){
  this._topIconActive = event.visible;
  this.resetNewNotificationsCount();
}

handleOnHiddenEvent(event){
  this._topIconActive = event.visible;
  this.setNotificationsAsViewed();
}

}
