const canvas = document.getElementById("canvas")
const gridItems = document.getElementsByClassName('grid-item');
let isToggling = false;

function makeRows() {
    rows = prompt("Enter number for square sketchpad size (Less than 100):")
    while(rows > 100) {
        rows = prompt("Number too large. Please enter number less than 100:")
    }
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', rows);
    const canvasHeight = canvas.clientHeight
    const canvasWidth = canvas.clientWidth
    for (c = 0; c < (rows * rows); c++) {
      let cell = document.createElement("div");
      canvas.appendChild(cell).className = "grid-item";
    };
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].className += " blank" 
        setDimensions(gridItems[i], canvasHeight, canvasWidth, rows)
    }
  };
  
  makeRows()

function setDimensions(div, boxHeight, boxWidth, rows) {
    div.style.height = boxHeight/rows + "px";
    div.style.width = boxWidth/rows + "px";
    div.style.padding = 100/rows + "%";
}

function clearCanvas() {
    const gridItems = document.getElementsByClassName('grid-item')
    for(let i = 0; i < gridItems.length; i++) {
        if (gridItems[i].classList.contains("filled")) gridItems[i].classList.remove('filled')
    }
}

document.addEventListener('click', (e) => {
    let element = e.target;
    if (element.matches('.clear.btn')) clearCanvas()
})

function enableToggle(e) {
  isToggling = true;

  if (e.target !== canvas) {
    toggle(e);
  }
}

function disableToggle() {
  isToggling = false;
}

function toggle(e) {
  if (isToggling === false) {
    return;
  }

  e.target.classList.toggle('filled');
}

function draw() {
  canvas.onmousedown = enableToggle;

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onmouseenter = toggle; //changes color 
  }

  canvas.onmouseup = disableToggle;
}

draw();