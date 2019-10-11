export interface Path {
  name: string;
  link: string;
}

export interface Day {
  number: number;
  isToday: boolean;
}

export interface Reminder {
  date: string;
  time: string;
  text: string;
  active: boolean;
}

export interface Task {
  text: string;
  complete: boolean;
}
