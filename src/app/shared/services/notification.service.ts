import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { URLSearchParams } from '@angular/http';
import { SocketService } from './socket.service';
import { Notification, NotificationType, TaskType, NotificationPriority, NotificationStatus, Contact } from '../../models';

@Injectable()
export class NotificationService {
  private timeoutPosition = 0;
  private timeouts = [1000, 2000, 5000, 9000, 1000, 1000, 1000, 10000, 90000, 500000];
  private _notification: BehaviorSubject<Notification>;

  constructor(private socketService: SocketService) {
    this._notification = <BehaviorSubject<Notification>>new BehaviorSubject(this.getNotification());
    this.generateNotification();
  }

  get notification() {
    return this._notification.asObservable();
  }

  private getUserRoomId(): string {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.paramsMap.get('?userId');
    const userId = userIdParam ? userIdParam[0] : '1';
    return userId;
  }

  private generateNotification() {
    const me = this;
    function generate() {
      setTimeout(() => {
        generate();
        me._notification.next(me.getNotification());
      }, me.getRandomTimeout());
    }

    generate();
  }

  private getNotification() {
    const notification: Notification = {
      id: new Date().getTime(),
      title: 'Lorem ipsum',
      type: this.getRandomNotificationType(),
      date: new Date(),
      message: new Date().getMinutes() + ':' + new Date().getSeconds(),
      sender: {
        id: 1,
        firstName: 'Jason',
        lastName: 'Chang',
        middleName: 'Chang',
        position: 'sales',
        contactInfo: [],
        address: null
      },
      taskType: TaskType.New,
      priority: NotificationPriority.Middle,
      notificationStatus: NotificationStatus.New,
      isViewed: false
    };

    return notification;
  }

  private getRandomTimeout() {
    if (this.timeoutPosition >= this.timeouts.length) this.timeoutPosition = 0;

    return this.timeouts[this.timeoutPosition++];
  }

  private getRandomNotificationType() {
    return Math.floor(Math.random() * 3);
  }
}
