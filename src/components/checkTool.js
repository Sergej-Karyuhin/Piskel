/* eslint-disable import/no-mutable-exports */
/* eslint-disable array-callback-return */
import Pen from './tools/pen';
import Bucket from './tools/bucket';
import FillBucket from './tools/fill-bucket';
import Eraser from './tools/eraser';
import Stroke from './tools/stroke';
import ColorPickerCanvas from './tools/color-picker-canvas';

import CopyCanvasBackground from './copyCanvasBackground';

let currentTool = 'pen';

export default class CheckTool {
  constructor() {
    this.canvas = document.querySelector('.canvas__item');
    this.toolContainer = document.querySelector('.tools__wrapper');
    this.toolsItemsAll = document.querySelectorAll('.tools__item');

    this.penTool = new Pen();
    this.bucketTool = new Bucket();
    this.fillBucketTool = new FillBucket();
    this.eraserTool = new Eraser();
    this.strokeTool = new Stroke();
    this.colorPickerCanvas = new ColorPickerCanvas();

    this.copyCanvasBackground = new CopyCanvasBackground();
  }

  static canselDefaultRightClick(e) {
    e.preventDefault();
  }

  static cloneCanvas(prevCanv) {
    // create a new canvas
    const newCanv = document.createElement('canvas');
    newCanv.classList.add('canvas__item');
    const ctx = newCanv.getContext('2d');

    // set dimensions
    newCanv.width = prevCanv.width;
    newCanv.height = prevCanv.height;

    // apply the old canvas to the new one
    ctx.drawImage(prevCanv, 0, 0);

    // return the new canvas
    return newCanv;
  }

  deletePrevFeature() {
    this.canvas = document.querySelector('.canvas__item'); // refresh link to actual canvas

    const prevCanv = this.canvas;
    const newCanv = CheckTool.cloneCanvas(prevCanv);
    prevCanv.parentNode.replaceChild(newCanv, prevCanv);

    this.canvas = newCanv;

    this.copyCanvasBackground.init();

    this.canvas.addEventListener('contextmenu', CheckTool.canselDefaultRightClick.bind(this));
  }

  highlight(targetToHL) {
    const arrayOfTools = [...this.toolsItemsAll];

    arrayOfTools.map((i) => {
      i.classList.remove('highlight_tool');
    });

    targetToHL.classList.add('highlight_tool');
  }

  setTool(target) {
    this.deletePrevFeature();

    switch (currentTool) {
      case 'pen':
        this.penTool.init();
        break;

      case 'eraser':
        this.eraserTool.init();
        break;

      case 'paint-bucket':
        this.bucketTool.init();
        break;

      case 'fill-bucket':
        this.fillBucketTool.init();
        break;

      case 'stroke':
        this.strokeTool.init();
        break;

      case 'color-picker':
        this.colorPickerCanvas.init();
        break;

      default:
        this.penTool.init();
        break;
    }

    // Highlight choosen tool
    this.highlight(target);
  }

  defineTool(e) {
    let { target } = e;
    let toolToHL = null;

    while (target.tagName !== 'UL') {
      currentTool = target.getAttribute('toolAttribute');

      toolToHL = target;
      target = target.parentElement;
    }

    this.setTool(toolToHL);
  }

  static setCurrentTool(name) {
    currentTool = name;
  }

  activePreviousTool() {
    const curActiveTool = document.querySelector('.highlight_tool');
    currentTool = curActiveTool.getAttribute('toolAttribute');
    this.setTool(curActiveTool);
  }

  init() {
    const curActiveTool = document.querySelector('.highlight_tool');
    this.setTool(curActiveTool);

    this.toolContainer.addEventListener('click', this.defineTool.bind(this));
  }
}
