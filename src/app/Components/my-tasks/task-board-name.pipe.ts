import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Objects/Task';

@Pipe({
  name: 'taskBoardName',
  pure: false
})
export class TaskBoardNamePipe implements PipeTransform {

  transform(tasks: Task[], name: string): Task[] {
    if (!name)
      return tasks;

    return tasks.filter(t => t.boardName.indexOf(name) !== -1);
  }
}
