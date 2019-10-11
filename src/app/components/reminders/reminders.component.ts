import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Reminder } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.styl']
})
export class RemindersComponent implements OnInit, OnDestroy {
  reminder: Reminder;
  reminders: Array<Reminder>;
  newReminder: Reminder = {
    date: null,
    time: null,
    text: null,
    active: false,
  };
  subscription: Subscription;

  constructor(private db: LocalStorageService) { }

  onAddReminder(reminder: Reminder): Array<Reminder> {
    const newReminders = [
      { ...reminder },
      ...this.reminders
    ];
    this.db.save('reminders', newReminders);
    this.resetRemindersForm();
    return newReminders;
  }

  resetRemindersForm() {
    this.reminder = { ...this.newReminder };
  }

  onDeleteReminder(reminders: Array<Reminder>, i: number): Array<Reminder> {
    const newReminders = [ ...reminders ];
    newReminders.splice(i, 1);
    this.db.save('reminders', newReminders);
    return newReminders;
  }

  getReminders(): Array<Reminder> {
    return this.db.get('reminders') || [];
  }

  markPassedReminders(reminders: Array<Reminder>): Array<Reminder> {
    return reminders.map((reminder: Reminder) => {
      const dateString = `${reminder.date}T${reminder.time}`;
      reminder.active = + new Date(dateString) > + new Date();
      return reminder;
    });
  }

  refreshReminders(): Array<Reminder> {
    this.reminders = this.markPassedReminders(this.getReminders());
    return this.reminders;
  }

  listenRemindersChange() {
    this.subscription = this.db
      .changes('reminders')
      .subscribe((nextValue: Array<Reminder>) => {
        this.reminders = this.markPassedReminders(nextValue);
      });
  }

  ngOnInit() {
    this.listenRemindersChange();
    this.refreshReminders();
    this.resetRemindersForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
