const canvas = document.getElementById("grid-canvas-element");
const colorPaletteContainer = document.getElementById("colors-palette");
const saveButtonElement = document.getElementById("save-button");

const grid = new Grid(canvas);
const controls = new Controls(
  { colorPaletteContainer, saveButtonElement },
  grid,
  new Pixel().getAvailableColors()
);
const gridEditor = new GridEditor(canvas, grid, controls);
