export default class CloneCanvas {
  static clone(oldCanvas) {
    if (oldCanvas) {
      // Create a new canvas
      const newCanv = document.createElement('canvas');
      const context = newCanv.getContext('2d');

      newCanv.setAttribute('class', 'canvas__item');

      // Set dimensions
      newCanv.width = oldCanvas.width;
      newCanv.height = oldCanvas.height;

      // Apply the old canvas to the new one
      context.drawImage(oldCanvas, 0, 0);

      return newCanv;
    }

    return null;
  }
}
