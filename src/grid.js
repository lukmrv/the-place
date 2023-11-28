class Grid {
  constructor(canvas, { width, height }) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext("2d");

    this.imageData = this.canvasContext.createImageData(width, height);

    this.canvas.width = this.imageData.width;
    this.canvas.height = this.imageData.height;
  }

  draw(context) {
    context.putImageData(this.imageData, 0, 0);
  }
}
