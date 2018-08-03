import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../Objects/Task';

@Pipe({
  name: 'taskName',
  pure: false
})
export class TaskNamePipe implements PipeTransform {

  transform(tasks: Task[], name: string): Task[] {
    if (!name)
      return tasks;

    return tasks.filter(t => t.title.indexOf(name) !== -1);
  }
}
