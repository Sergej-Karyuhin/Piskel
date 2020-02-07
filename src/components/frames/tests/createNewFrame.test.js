/* eslint-disable operator-linebreak */
import CreateNewFrame from '../createNewFrame';

describe('CreateNewFrame.init', () => {
  it('Must be a function type', () => {
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

    const createNewFrame = new CreateNewFrame();
    createNewFrame.emptyFrame = document.querySelector('.frame__background');
    createNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    createNewFrame.addButtonFrame = document.querySelector('.frames__add-frames-button');
    expect(createNewFrame.init).toBeInstanceOf(Function);
  });

  it('Must create a new frame', () => {
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

    const createNewFrame = new CreateNewFrame();
    createNewFrame.emptyFrame = document.querySelector('.frame__background');
    createNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    createNewFrame.addButtonFrame = document.querySelector('.frames__add-frames-button');
    createNewFrame.init(2);
    expect(createNewFrame.frameWrapper.children[1].children[0].className).toEqual('frame__unit');
  });

  it('Must create a new frame with correct index', () => {
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

    const createNewFrame = new CreateNewFrame();
    createNewFrame.emptyFrame = document.querySelector('.frame__background');
    createNewFrame.frameWrapper = document.querySelector('.frames__wrapper');
    createNewFrame.addButtonFrame = document.querySelector('.frames__add-frames-button');
    createNewFrame.init(2);
    expect(createNewFrame.frameWrapper.children[1].children[0].children[1].textContent).toEqual('2');
  });
});
