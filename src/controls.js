class Controls {
  constructor({ colorPaletteContainer, saveButtonElement }, grid, colorSet) {
    this.colorPaletteContainer = colorPaletteContainer;
    this.saveButtonElement = saveButtonElement;
    this.colorSet = colorSet;

    this.grid = grid;

    this.selectedColor = Object.values(colorSet)[0];

    this.initControls();
  }

  getSelectedColor() {
    return this.selectedColor;
  }

  createColorOption(colorOption) {
    // <div class="control-option"></div>
    const controlElement = document.createElement("div");
    controlElement.classList.add("control-option");
    controlElement.style.backgroundColor = `rgba(
          ${colorOption[0]},
          ${colorOption[1]},
          ${colorOption[2]},
          ${colorOption[3]}
      )`;

    // Check if the current color option is the selected color on load
    if (
      this.selectedColor[0] === colorOption[0] &&
      this.selectedColor[1] === colorOption[1] &&
      this.selectedColor[2] === colorOption[2] &&
      this.selectedColor[3] === colorOption[3]
    ) {
      controlElement.classList.add("selected");
    }

    controlElement.addEventListener("click", (event) => {
      // Remove 'selected' class from all color options
      this.colorPaletteContainer
        .querySelectorAll(".control-option")
        .forEach((option) => option.classList.remove("selected"));

      // Add 'selected' class to the clicked color option
      event.target.classList.add("selected");

      this.selectedColor = colorOption;
    });

    this.colorPaletteContainer.appendChild(controlElement);
  }

  initControls() {
    Object.keys(this.colorSet)
      .filter((colorOption) => !colorOption.includes("_"))
      .forEach((colorOption) =>
        this.createColorOption(this.colorSet[colorOption])
      );

    this.saveButtonElement.addEventListener("click", () =>
      this.grid.saveData()
    );
  }
}
