import { Component } from '@angular/core';
import { Path } from '@app/shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'organizer';
  paths: Array<Path> = [
    {
      name: 'Календарь',
      link: '/calendar'
    },
    {
      name: 'Напоминания',
      link: '/reminders'
    },
    {
      name: 'Список задач',
      link: '/tasks'
    }
  ];
}
