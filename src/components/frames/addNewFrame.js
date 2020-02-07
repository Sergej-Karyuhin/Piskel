import { currentFrameIndex, setCurrentFrameIndex, framesArray } from './frames';
import CloneCanvas from './cloneCanvas';
import CreateNewFrame from './createNewFrame';
import SetPrevFrame from './setPrevFrame';
import PreviewTool from '../preview/preview';
import CheckTool from '../checkTool';
import ShowCurrentFrame from './showCurrentFrame';

export default class AddNewFrame {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.emptyCanvas = CloneCanvas.clone(this.canvas);
    this.emptyDataURL = this.canvas.toDataURL(); // TODO
    this.emptyFrame = document.querySelector('.frame__background');
    this.setPrevFrame = new SetPrevFrame(this.emptyDataURL);
    this.cloneCanvas = new CloneCanvas();
    this.createNewFrame = new CreateNewFrame(this.emptyFrame);
    this.previewTool = new PreviewTool();
    this.checkTool = new CheckTool();
    this.showCurrentFrame = new ShowCurrentFrame();
  }

  addFrame() {
    // Renew links
    this.canvas = document.querySelector('.canvas__item');
    this.ctx = this.canvas.getContext('2d');

    // Save prev canvas
    framesArray[currentFrameIndex] = CloneCanvas.clone(this.canvas);

    // Clean canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    setCurrentFrameIndex(framesArray.length);

    framesArray.push(this.emptyCanvas);

    this.createNewFrame.init(currentFrameIndex + 1);

    // !!! DRAG
    this.showCurrentFrame.highlightSelectedFrame();
    // !!! DRAG

    // Add frame preview
    this.setPrevFrame.setEmpty(currentFrameIndex);

    // Choose previous active tool
    this.checkTool.activePreviousTool();

    // Add preview
    this.previewTool.show();
  }
}
