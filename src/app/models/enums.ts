// customer enums
export enum CustomerTypes {
  Broker = 1,
  FreightForwarder = 2,
  Shipper = 3,
  Carrier = 4
};

export enum CustomerStatuses {
  Inactive = 0,
  Active = 1,
  Unavaliable = 2
}

// driver enums
export enum DriverTypes {
  Company = 0
};

export enum DriverStatuses {
  Inactive = 0,
  Active = 1,
  Unavaliable = 2
}

export enum DriverPaymentOptions {
  PerMile = 0,
  Percentage = 1,
  Hourly = 2,
  Flat = 3
}

// equipment enums
export enum EquipmentTypes {
  Trailer = 0,
  PowerUnit = 1
};

export enum EquipmentModes {
  Company = 0
};

export enum EquipmentStatuses {
  Inactive = 0,
  Active = 1,
  NotAvaliable = 2
}

export enum EquipmentVehicleOperatings {
  InterState = 0,
  IntraState = 1
}

// load enums
export enum LoadStatuses {
  Booked = 1,
  Assigned = 2,
  Pending = 3,
  Scheduled = 4,
  EnRoute = 5,
  InTransit = 6,
  Delivered = 7,
  Completed = 8,
  Canceled = 9,
}

export enum DriverRequirements {
  Solo = 1
};

export enum LoadType {
  FTL = 1,
  LTL = 2
};

export enum FreightType {
  Dry = 1,
  Reefer = 2
}

export enum PowerUnitTypes {
  Tractor = 1,
  StraightTruck25 = 2,
  StraightTruckFlatbed = 3,
  Bus = 4,
  Other = 5
};

export enum TrailerTypes {
  DryVan53 = 1,
  Reefer = 2,
  DryVan48 = 3,
  Reefer48 = 4,
  FlatBed53 = 5,
  Other = 6,
};

// notification enums
export enum NotificationStatus {
  New = 1,
  Add = 2,
  Error = 3
};

export enum NotificationType {
  Notification = 0,
  Message = 1,
  Task = 2
};

export enum NotificationPriority {
  High = 0,
  Middle = 1,
  Low = 2,
};

export enum TaskType {
  New = 1,
  InProgress = 2,
  Done = 3,
  Error = 4
}

// stop enums
export enum StopTypes {
  None = 0,
  Pickup = 1,
  Dropoff = 2
};

export enum StopStatuses {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Problem = 3
};