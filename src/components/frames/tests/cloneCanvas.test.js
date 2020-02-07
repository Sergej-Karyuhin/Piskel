/* eslint-disable operator-linebreak */
import CloneCanvas from '../cloneCanvas';

describe('CloneCanvas.clone', () => {
  it('Must be a function type', () => {
    expect(CloneCanvas.clone).toBeInstanceOf(Function);
  });

  it('Returns null if it does not transfer canvas to a clone of canvas', () => {
    expect(CloneCanvas.clone()).toEqual(null);
  });
});
