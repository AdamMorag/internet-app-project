import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../Objects/Board';

@Pipe({
  name: 'boardName',
  pure:false
})
export class BoardNamePipe implements PipeTransform {

  transform(boards: Board[], name: string): Board[] {
    if (!name)
      return boards;

    return boards.filter(b => b.title.indexOf(name) !== -1);
  }

}
