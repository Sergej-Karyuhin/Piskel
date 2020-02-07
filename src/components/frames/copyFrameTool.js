import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CheckIndex from './checkIndex';
import CreateNewFrame from './createNewFrame';
import SetPrevFrame from './setPrevFrame';
import PreviewTool from '../preview/preview';
import CheckTool from '../checkTool';

export default class CopyFrameTool {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.cloneCanvas = new CloneCanvas();
    this.prevFrame = 0;
    this.currentFrame = 0;
    this.emptyFrame = document.querySelector('.frame__background');
    this.createNewFrame = new CreateNewFrame(this.emptyFrame);
    this.setPrevFrame = new SetPrevFrame();
    this.frameWrapper = document.querySelector('.frames__wrapper');
    this.previewTool = new PreviewTool();
    this.checkTool = new CheckTool();
  }

  run(e) {
    this.canvas = document.querySelector('.canvas__item'); // Refresh link

    if (e.target.className.indexOf('copy') > -1) {
      framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas); // Save prev canvas

      setCurrentFrameIndex(CheckIndex.check(e));

      framesArray.push(framesArray[currentFrameIndex]);

      const frames = document.querySelectorAll('.frame__unit');
      const arrayOfFrames = [...frames];
      const elem = arrayOfFrames[currentFrameIndex];
      const neadedFramePrev = elem.style.backgroundImage;

      const canvParent = this.canvas.parentElement;


      this.canvas = document.querySelector('.canvas__item'); // Refresh link

      const elemInsert = CloneCanvas.clone(framesArray[currentFrameIndex]);

      canvParent.replaceChild(elemInsert, this.canvas);

      const newCanv = canvParent.children[0];
      newCanv.setAttribute('class', 'canvas__item');

      this.prevFrame = this.currentFrame;
      this.currentFrame += 1;

      const newIndex = framesArray.length;

      this.createNewFrame.init(newIndex);

      this.setPrevFrame.init(null, neadedFramePrev);

      setCurrentFrameIndex(framesArray.length - 1);

      // Choose pverious active tool
      this.checkTool.activePreviousTool();

      // Add preview
      this.previewTool.show();
    }
  }

  init() {
    this.frameWrapper.addEventListener('mousedown', this.run.bind(this));
  }
}
