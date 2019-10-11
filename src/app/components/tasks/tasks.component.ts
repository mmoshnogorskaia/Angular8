import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Subscription } from 'rxjs';
import { Task } from '@app/shared/interfaces';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.styl']
})
export class TasksComponent implements OnInit, OnDestroy {
  task: Task;
  tasks: Array<Task>;
  newTask: Task = {
    text: null,
    complete: false
  };
  subscription: Subscription;

  constructor(private db: LocalStorageService) { }

  onAddTask(task: Task): Array<Task> {
    const newTasks = [
      { ...task },
      ...this.tasks
    ];
    this.db.save('tasks', newTasks);
    this.resetTasksForm();
    return newTasks;
  }

  listenTasksChange() {
    this.subscription = this.db
      .changes('tasks')
      .subscribe((nextValue: Array<Task>) => {
        this.tasks = nextValue;
      });
  }

  refreshTasks(): Array<Task> {
    this.tasks = this.getTasks();
    return this.tasks;
  }

  getTasks(): Array<Task> {
    return this.db.get('tasks') || [];
  }

  resetTasksForm() {
    this.task = { ...this.newTask };
  }

  onDeleteTask(tasks: Array<Task>, i: number): Array<Task> {
    const newTasks = [ ...tasks ];
    newTasks.splice(i, 1);
    this.db.save('tasks', newTasks);
    return newTasks;
  }


  ngOnInit() {
    this.listenTasksChange();
    this.refreshTasks();
    this.resetTasksForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
