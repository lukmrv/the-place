// TODO - manipulate grid size while not losing saved data

class Grid {
  constructor(canvas) {
    this.localstorageImageKey = "the-place-image-data-object";
    this.DEFAULT_GRID_WIDTH = 100;
    this.DEFAULT_GRID_HEIGHT = 100;

    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext("2d");

    // Initialize imageData with default size
    this.imageData = this.#createImageData(
      this.DEFAULT_GRID_WIDTH,
      this.DEFAULT_GRID_HEIGHT
    );

    this.canvas.width = this.imageData.width;
    this.canvas.height = this.imageData.height;

    this.loadData();
  }

  #createImageData(width, height) {
    return this.canvasContext.createImageData(width, height);
  }

  draw(context) {
    context.putImageData(this.imageData, 0, 0);
  }

  saveData() {
    try {
      const imageDataObject = {
        width: this.imageData.width,
        height: this.imageData.height,
        colorSpace: this.imageData.colorSpace,
        data: Array.from(this.imageData.data),
      };

      const imageDataString = JSON.stringify(imageDataObject);
      localStorage.setItem(this.localstorageImageKey, imageDataString);
    } catch (error) {
      console.error("Error occurred while saving image data", error);
    }
  }

  #parseLocalStorageData(dataString) {
    try {
      const savedImageDataObject = JSON.parse(dataString);

      const imageWidth = savedImageDataObject.width || this.DEFAULT_GRID_WIDTH;
      const imageHeight =
        savedImageDataObject.height || this.DEFAULT_GRID_HEIGHT;

      const dataArray = new Uint8ClampedArray(savedImageDataObject.data);

      return new ImageData(dataArray, imageWidth, imageHeight);
    } catch (error) {
      console.error("Error occurred while parsing saved image data", error);
      return this.#createImageData(
        this.DEFAULT_GRID_WIDTH,
        this.DEFAULT_GRID_HEIGHT
      );
    }
  }

  loadData() {
    try {
      const imageDataString = localStorage.getItem(this.localstorageImageKey);

      if (imageDataString) {
        this.imageData = this.#parseLocalStorageData(imageDataString);
      } else {
        this.imageData = this.#createImageData(
          this.DEFAULT_GRID_WIDTH,
          this.DEFAULT_GRID_HEIGHT
        );
      }

      this.canvas.width = this.imageData.width;
      this.canvas.height = this.imageData.height;

      this.canvasContext.putImageData(this.imageData, 0, 0);
    } catch (error) {
      console.error("Error occurred while loading image data", error);
    }
  }
}
