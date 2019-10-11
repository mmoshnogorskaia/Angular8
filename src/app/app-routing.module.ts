import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './components/calendar/calendar.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '',   redirectTo: '/calendar', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
