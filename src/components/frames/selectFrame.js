import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import CreateNewFrame from './createNewFrame';
import PreviewTool from '../preview/preview';

import CheckTool from '../checkTool';

export default class SelectFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.cloneCanvas = new CloneCanvas();
    this.emptyFrame = document.querySelector('.frame__unit');
    this.createNewFrame = new CreateNewFrame(this.emptyFrame);
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.previewTool = new PreviewTool();

    this.checkTool = new CheckTool();
  }

  selectFrame(e) {
    const targetClass = e.target.className;
    const targetParentClass = e.target.parentElement.className;

    if (targetClass.indexOf('frame__unit') >= 0 || targetParentClass.indexOf('frame__unit') >= 0) {
      this.canvas = document.querySelector('.canvas__item'); // Refresh link

      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save prev canvas

      setCurrentFrameIndex(CheckIndex.check(e));

      const canvParent = this.canvas.parentNode;

      // Get selected canvas
      const elemInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvParent.replaceChild(elemInsert, this.canvas);

      const newCanv = canvParent.children[0];
      newCanv.setAttribute('class', 'canvas__item');

      // Choose pverious active tool
      this.checkTool.activePreviousTool();

      // Add preview
      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.selectFrame.bind(this));
  }
}
