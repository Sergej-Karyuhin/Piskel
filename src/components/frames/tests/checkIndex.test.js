/* eslint-disable operator-linebreak */
import CheckIndex from '../checkIndex';

describe('CheckIndex.check', () => {
  it('Must be a function type', () => {
    expect(CheckIndex.check).toBeInstanceOf(Function);
  });

  it('Must return the correct frame index', () => {
    document.body.innerHTML =
      '<div class="frames__wrapper">' +
        '<div class="frame__background">' +
          '<div class="frame__unit">' +
            '<div class="frame__item-button copy hide-button"><i class="fas fa-copy frame-button-icon"></i></div>' +
            '<div class="frame__item-button index">1</div>' +
            '<div class="frame__item-button trash hide-button"><i class="fas fa-trash-alt frame-button-icon"></i></div>' +
          '</div>' +
        '</div>' +
      '</div >';

    const targetElem = document.querySelector('.frame__unit');

    const e = {
      target: targetElem,
    };

    expect(CheckIndex.check(e)).toEqual(0);
  });
});
