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
      gridItems[i].style.setProperty('background-color', 'white')
    }
}

document.addEventListener('click', (e) => {
    let element = e.target;
    if (element.matches('.clear.btn')) clearCanvas()
})


//toggle fill

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
  if (isToggling ===false) return

  e.target.style.setProperty('background-color', colorWell.value)
}

function draw() {
  colorWell = document.querySelector("#colorWell")
  colorWell.value = defaultColor;
  canvas.onmousedown = enableToggle;

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onmouseenter = toggle; 
  }

  canvas.onmouseup = disableToggle;
}


//Code for color selector

let colorWell; 
const defaultColor = "#000000";

window.addEventListener("load", startup, false);

function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.select(); //this one is just in case color well is browser incompatible
}

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

//change colorWell on button click
document.addEventListener('click', (e) => {
  let element = e.target;
  let colorWell = document.querySelector("#colorWell")
  if (element.matches(".color-select")) colorWell.value = RGBToHex(element.style.backgroundColor);
})

draw();