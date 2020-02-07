import CloneCanvas from './frames/cloneCanvas';
import { currentFrameIndex, framesArray } from './frames/frames';

export default class CopyCanvasBackground {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.canvasBackground = document.querySelector('.canvas__BG');
    this.cloneCanvas = new CloneCanvas();
  }

  init() {
    this.canvasBackground = document.querySelector('.canvas__BG'); // refresh link

    const newBGElem = this.canvasBackground.cloneNode(true);
    newBGElem.classList.add('canvas__BG');

    const canvasBGParent = this.canvasBackground.parentNode;

    canvasBGParent.replaceChild(newBGElem, this.canvasBackground);


    this.canvas = document.querySelector('.canvas__item'); //  refresh link

    const canvParent = this.canvas.parentNode;
    const elemInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);
    if (elemInsert) {
      canvParent.replaceChild(elemInsert, this.canvas);
    }

    const newCanv = canvParent.children[0];
    newCanv.className = 'canvas__item';
  }
}
