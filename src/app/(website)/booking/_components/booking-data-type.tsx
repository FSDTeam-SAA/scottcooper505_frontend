export interface ServiceResponse {
  status: boolean;
  message: string;
  data: ServiceData;
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  duration: string;
  schedule: ScheduleItem[];
  createdBy: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
  generatedSlots: GeneratedSlot[];
}

export interface ScheduleItem {
  date: string; // ISO Date string
  startTime: string; // e.g. "00:12"
  endTime: string;   // e.g. "23:20"
}

export interface GeneratedSlot {
  date: string; // ISO Date string
  slots: Slot[];
}

export interface Slot {
  startTime: string; // e.g. "00:12"
  endTime: string;   // e.g. "00:42"
}
