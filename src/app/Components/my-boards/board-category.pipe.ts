import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../Objects/Board';

@Pipe({
  name: 'boardCategory'
})
export class BoardCategoryPipe implements PipeTransform {

  transform(boards: Board[], categoryId: number): Board[] {
    if (!categoryId)
      return boards;

    return boards.filter(b => b.categoryId === categoryId);
  }

}
