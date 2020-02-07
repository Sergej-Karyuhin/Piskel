export default class CreateNewFrame {
  constructor(emptyFrame) {
    this.emptyFrame = emptyFrame;
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.addButtonFrame = document.querySelector('.frames__add-frames-button');
  }

  init(index) {
    const newFrame = this.emptyFrame.cloneNode(true);

    const frameIndex = newFrame.children[0].children[1];
    frameIndex.textContent = index;

    newFrame.children[0].style.position = 'relative';
    newFrame.children[0].style.zIndex = 'auto';
    newFrame.children[0].style.top = 'auto';
    newFrame.children[0].style.left = 'auto';

    this.frameWrapper.insertBefore(newFrame, this.addButtonFrame);
  }
}
