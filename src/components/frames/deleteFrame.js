/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import CreateNewFrame from './createNewFrame';
import SetPrevFrame from './setPrevFrame';
import PreviewTool from '../preview/preview';
import CheckTool from '../checkTool';

let storage;
const wasDeleteFrameUsed = [false];

export default class DeleteFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.emptyFrame = document.querySelector('.frame__background');
    this.createNewFrame = new CreateNewFrame(this.emptyFrame);
    this.cloneCanvas = new CloneCanvas();
    this.emptyCanvas = CloneCanvas.clone(this.canvas);
    this.emptyDataURL = this.canvas.toDataURL();
    this.setPrevFrame = new SetPrevFrame(this.emptyDataURL);
    this.previewTool = new PreviewTool();
    this.checkTool = new CheckTool();
  }

  delete() {
    wasDeleteFrameUsed[0] = true;

    // Renew links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    // Delete from DOM
    const frames = document.querySelectorAll('.frame__background');
    const arrayOfFrames = [...frames];
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.frameWrapper.removeChild(arrayOfFrames[currentFrameIndex]);

    // Delete from canvases Data
    framesArray.splice(currentFrameIndex, 1);

    if (currentFrameIndex) {
      storage = currentFrameIndex;
      storage -= 1;
      setCurrentFrameIndex(storage); // Change index to the previous frame
    }

    const canvParent = this.canvas.parentNode;

    if (framesArray.length !== 0) {
      const elemInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvParent.replaceChild(elemInsert, this.canvas);

      const newCanv = canvParent.children[0];
      newCanv.className = 'canvas__item';

      // Add frame preview
      this.setPrevFrame.init();
    } else {
      this.createNewFrame.init(currentFrameIndex + 1);

      canvParent.replaceChild(this.emptyCanvas, this.canvas);

      const newCanv = canvParent.children[0];
      newCanv.className = 'canvas__item';

      // Add frame preview
      this.setPrevFrame.setEmpty();
    }
  }

  deleteFrame(e) {
    // Refresh link
    this.canvas = document.querySelector('.canvas__item');

    if (e.target.className.indexOf('trash') >= 0) {
      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save prev canvas

      setCurrentFrameIndex(CheckIndex.check(e));

      this.delete();

      // Set correct index of frame
      const frames = document.querySelectorAll('.frame__unit');
      const arrayOfFrames = [...frames];
      arrayOfFrames.map((i, j) => {
        i.children[1].textContent = `${j + 1}`;
      });

      // Choose pverious active tool
      this.checkTool.activePreviousTool();

      // Add preview
      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.deleteFrame.bind(this));
  }
}

export { wasDeleteFrameUsed };
