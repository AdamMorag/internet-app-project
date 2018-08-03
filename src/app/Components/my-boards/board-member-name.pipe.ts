import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../Objects/Board';

@Pipe({
  name: 'boardMemberName',
  pure: false
})
export class BoardMemberNamePipe implements PipeTransform {

  transform(boards: Board[], boardMemberName: string): Board[] {
    if (!boardMemberName)
      return boards;

    return boards.filter(b => (<any[]>b.boardMembers)
      .some(bm => bm.name.indexOf(boardMemberName) !== -1));
  }
}
