const canvas = document.getElementById("canvas")

function makeRows() {
    rows = prompt("Enter number for square sketchpad size (Less than 100):")
    while(rows > 100) {
        rows = prompt("Number too large. Please enter number less than 100:")
    }
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', rows);
    for (c = 0; c < (rows * rows); c++) {
      let cell = document.createElement("div");
      canvas.appendChild(cell).className = "grid-item";
    };
    const gridItems = document.getElementsByClassName('grid-item')
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].className += " blank" 
        setDimensions(gridItems[i], rows)
    }
  };
  
  makeRows()

function setDimensions(div, rows) {
    div.style.height = 800/rows + "px";
    div.style.width = 800/rows + "px";
    div.style.padding = 100/rows + "%";
}

document.addEventListener('mouseover', (e) => {
    let element = e.target;
    if (element.classList.contains("grid-item")) {
        if (!element.classList.contains("filled")) element.classList.add('filled')
        else element.classList.remove('filled')
    }
})