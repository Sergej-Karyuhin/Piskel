import ColorPicker from '../../components/tools/color-picker';
import Frames from '../../components/frames/frames';
import DeleteFrame from '../../components/frames/deleteFrame';
import SetPrevFrame from '../../components/frames/setPrevFrame';
import AddNewFrame from '../../components/frames/addNewFrame';
import CopyFrameTool from '../../components/frames/copyFrameTool';
import SelectFrame from '../../components/frames/selectFrame';
import ShowCurrentFrame from '../../components/frames/showCurrentFrame';
import PreviewTool from '../../components/preview/preview';
import FullScreenTool from '../../components/preview/fullScreenTool';
import CheckTool from '../../components/checkTool';
import DragAndDrop from '../../components/frames/drag&drop';
import APNG from '../../components/apng_gif/aPNGCreate';
import GIFCreate from '../../components/apng_gif/gifCreate';

export default class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.emptyDataURL = this.canvas.toDataURL();
    this.setPrevFrame = new SetPrevFrame(this.emptyDataURL);
    this.addNewFrame = new AddNewFrame();
    this.addButtonFrame = document.querySelector('.frames__add-frames-button');
    this.canvasContainer = document.querySelector('#canvas__wrapper');
    this.dragAndDrop = new DragAndDrop();
    this.aPNG = new APNG();
    this.gifCreate = new GIFCreate();
  }

  init() {
    this.canvasContainer.addEventListener('contextmenu', this.canselDefaultRightClick);

    // Check/set current tool
    const checkTool = new CheckTool();
    checkTool.init();

    const colorPicker = new ColorPicker();
    colorPicker.init();

    const frames = new Frames();
    frames.init();

    const deleteFrame = new DeleteFrame();
    deleteFrame.init();

    const copyFrameTool = new CopyFrameTool();
    copyFrameTool.init();


    // Drag & drop (frames)
    this.dragAndDrop.init();

    const previewTool = new PreviewTool();
    previewTool.init();

    // Fullscreen mode for preview
    const fullScreenTool = new FullScreenTool();
    fullScreenTool.init();

    // Add frame preview
    this.canvasContainer.addEventListener('click', this.setPrevFrame.init.bind(this));
    this.canvasContainer.addEventListener('contextmenu', this.setPrevFrame.init.bind(this));

    // Add feature to add new frame
    this.addButtonFrame.addEventListener('click', this.addNewFrame.addFrame.bind(this.addNewFrame));

    const selectFrame = new SelectFrame();
    selectFrame.init();

    // Highlight selected frames
    this.firstFrame = document.querySelector('.frame__unit');
    this.firstFrame.style.borderColor = 'rgb(255, 215, 0)';
    const showCurrentFrame = new ShowCurrentFrame();
    showCurrentFrame.init();

    // Download .apng
    this.aPNG.init();

    // Download .gif
    this.gifCreate.init();
  }
}
