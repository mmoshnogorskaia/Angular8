import { Component, OnInit } from '@angular/core';
import { WEEKDAYS, MONTHS } from '@app/shared/constants';
import { Day } from '@app/shared/interfaces';
import { calcOffset, getDaysInCurrentMonth } from '@app/shared/util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit {

  weekdays: Array<string> = WEEKDAYS;
  today: Date;
  month: string;
  days: Array<Day>;

  constructor() { }

  setDate() {
    this.today = new Date();
    this.month = MONTHS[this.today.getMonth()];
  }

  createDaysArray() {
    const emptyDay: Day = {
      number: null,
      isToday: false,
    };
    this.days = new Array(calcOffset(this.today))
      .fill(emptyDay) || [];
    const daysInMonth = getDaysInCurrentMonth(this.today);
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push({
        number: i,
        isToday: i === this.today.getDate(),
      });
    }
  }

  ngOnInit() {
    this.setDate();
    this.createDaysArray();
  }
}
