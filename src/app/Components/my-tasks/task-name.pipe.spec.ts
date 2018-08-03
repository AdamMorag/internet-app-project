import { TaskNamePipe } from './task-name.pipe';

describe('TaskNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TaskNamePipe();
    expect(pipe).toBeTruthy();
  });
});
