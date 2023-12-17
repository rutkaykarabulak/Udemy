import {create, createReportList} from "./modules/canvas.js";
import {name, draw, reportArea, reportPerimeter} from "./modules/square.js";
import randomSquare from './modules/square.js';

const body = document.body;

const myCanvas = create('myCanvas', body, 480, 320);
const reportList = createReportList(myCanvas.id);

const square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
const square2 = randomSquare(myCanvas.ctx);
