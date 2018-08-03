import { TaskBoardNamePipe } from './task-board-name.pipe';

describe('TaskBoardNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TaskBoardNamePipe();
    expect(pipe).toBeTruthy();
  });
});
