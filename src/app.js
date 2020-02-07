import Canvas from './screens/canvas/script';
import './screens/canvas/style.css';
import './components/tools/picker-style.css';
import './components/frames/frames.css';


function startApplication() {
  const canvas = new Canvas();
  canvas.init();
}

window.onload = startApplication();
