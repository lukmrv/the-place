const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;

const canvas = document.getElementById("grid-canvas-element");
const controlsElement = document.getElementById("controls-container");

const grid = new Grid(canvas, {
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
});
const controls = new Controls(
  controlsElement,
  new Pixel().getAvailableColors()
);
const gridEditor = new GridEditor(canvas, grid, controls);

gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 3, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 4, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 5, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 6, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 7, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 8, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 9, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 10, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 11, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 12, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 13, y: 2 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 14, y: 2 });

gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 3, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 41, y: 15 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 5, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 6, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 7, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 8, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 9, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 10, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 11, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 12, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 13, y: 10 });
gridEditor.insertPixelAt(new Pixel("green").getColorEntity(), { x: 14, y: 10 });

gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 3, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 4, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 5, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 6, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 7, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 8, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 9, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 10, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 11, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 12, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 13, y: 4 });
gridEditor.insertPixelAt(new Pixel("yellow").getColorEntity(), { x: 14, y: 4 });

gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 3, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 4, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 5, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 6, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 7, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 8, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 9, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 10, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 11, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 12, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 13, y: 6 });
gridEditor.insertPixelAt(new Pixel("red").getColorEntity(), { x: 14, y: 6 });

gridEditor.display();
