import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';
import { Task } from '../../Objects/Task';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  public myTasks: Task[];
  public loadingMyTasks = true;

  taskName: FormControl = new FormControl("");
  boardName: FormControl = new FormControl("");
  taskStatus: FormControl = new FormControl("");

  constructor(private _tasksService: TasksService) {
    _tasksService.getUserTasks(localStorage.getItem("uid"))
      .subscribe(userTasks => {
        this.myTasks = userTasks
        this.loadingMyTasks= false;        
      });
  }

  ngOnInit() {
  }

  public onTaskDeleted(taskId: string): void {
    const taskIndex = this.myTasks.findIndex(t => t.taskId === taskId);
    this.myTasks.splice(taskIndex, 1);
  }
}
