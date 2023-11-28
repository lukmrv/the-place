class GridEditor {
  constructor(canvas, grid, controls) {
    this.canvas = canvas;
    this.grid = grid;
    this.controls = controls;

    console.log("this.selectedColor", this.selectedColor);

    this.context = this.canvas.getContext("2d");

    this.previousPixel = { x: null, y: null, data: null };
    this.currentPixel = { x: null, y: null, data: null };

    this.#addEventListeners();
  }

  insertPixelAt(pixel, { x, y }) {
    const pixelStartingIndexPosition =
      y * (this.grid.imageData.width * 4) + x * 4;

    this.grid.imageData.data[pixelStartingIndexPosition] = pixel[0];
    this.grid.imageData.data[pixelStartingIndexPosition + 1] = pixel[1];
    this.grid.imageData.data[pixelStartingIndexPosition + 2] = pixel[2];
    this.grid.imageData.data[pixelStartingIndexPosition + 3] = pixel[3];
  }

  #getPixelData({ x, y }) {
    const r =
      this.grid.imageData.data[y * (this.grid.imageData.width * 4) + x * 4];
    const g =
      this.grid.imageData.data[y * (this.grid.imageData.width * 4) + x * 4 + 1];
    const b =
      this.grid.imageData.data[y * (this.grid.imageData.width * 4) + x * 4 + 2];
    const a =
      this.grid.imageData.data[y * (this.grid.imageData.width * 4) + x * 4 + 3];

    return [r, g, b, a];
  }

  #getMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const pixelX = (event.clientX - rect.left) * scaleX;
    const pixelY = (event.clientY - rect.top) * scaleY;
    const correctedX = Math.max(Math.floor(pixelX), 0);
    const correctedY = Math.max(Math.floor(pixelY), 0);

    return { mouseX: correctedX, mouseY: correctedY };
  }

  #isEmptyPixel(pixel) {
    if (pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0) {
      return true;
    }
    return false;
  }

  #handleMouseMove() {
    this.canvas.addEventListener("mousemove", (event) => {
      const { mouseX, mouseY } = this.#getMousePosition(event);

      const isPixelChangeOccured =
        mouseX !== this.previousPixel?.x || mouseY !== this.previousPixel?.y;

      if (isPixelChangeOccured) {
        const hoveredPixel = this.#getPixelData({
          x: mouseX,
          y: mouseY,
        });

        const hoverPixelStyle = () => {
          if (this.#isEmptyPixel(hoveredPixel)) {
            return [
              ...this.controls.getSelectedColor().slice(0, -1),
              this.controls.getSelectedColor().at(-1) * 0.5, // alpha multiplier
            ];
          }
          return [
            ...hoveredPixel.slice(0, -1),
            hoveredPixel.at(-1) * 0.5, // alpha multiplier
          ];
        };

        // set current pixel state
        this.insertPixelAt(hoverPixelStyle(), {
          x: mouseX,
          y: mouseY,
        });

        // restore previous pixel state
        if (this.previousPixel.data) {
          this.insertPixelAt(this.previousPixel.data, {
            x: this.previousPixel.x,
            y: this.previousPixel.y,
          });
        }

        this.previousPixel = {
          x: mouseX,
          y: mouseY,
          data: hoveredPixel,
        };

        this.display();
      }
    });
  }

  #handleMouseOut() {
    this.canvas.addEventListener("mouseout", () => {
      // Restore the color of the previous hovered pixel when the mouse leaves the canvas
      if (this.previousPixel.data) {
        this.insertPixelAt(this.previousPixel.data, {
          x: this.previousPixel.x,
          y: this.previousPixel.y,
        });
        this.previousPixel = { x: null, y: null, data: null };
      }
      this.display();
    });
  }

  #handleMouseDown() {
    this.canvas.addEventListener("mousedown", (event) => {
      const { mouseX, mouseY } = this.#getMousePosition(event);
      const clickedPixel = this.controls.getSelectedColor();

      this.insertPixelAt(
        [
          ...clickedPixel.slice(0, -1),
          clickedPixel.at(-1) * 0.5, // alpha multiplier
        ],
        {
          x: mouseX,
          y: mouseY,
        }
      );

      this.previousPixel = {
        x: mouseX,
        y: mouseY,
        data: clickedPixel,
      };

      this.display();
    });
  }

  #addEventListeners() {
    this.#handleMouseMove();
    this.#handleMouseOut();
    this.#handleMouseDown();
  }

  display() {
    this.grid.draw(this.context);
  }
}
