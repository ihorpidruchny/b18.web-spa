export enum NotificationPriority {
  high = 0,
  middle = 1,
  low = 2,
}

export enum eventType {
  New = 1,
  InProgress = 2,
  Done = 3,
  Error = 4
}

const eventStatusColors = createEventStatusColors();

// Colors
function createEventStatusColors() {
 let result = {};
  result[eventType.New] = '#75b3e1';
  result[eventType.InProgress] = '#ffbe4d';
  result[eventType.Done] = '#85d183';
  result[eventType.Error] = '#fb3a3a';

  return result;
};

export class NotificationItem {
  private static statusText = ['HI', 'LO', 'ME'];

  public static getPriorityText(priority: NotificationPriority): string {
    return NotificationItem.statusText[priority];
  }

  public static getEventTypeColor(eventType: eventType): string {
    return eventStatusColors[eventType];
  }
}
