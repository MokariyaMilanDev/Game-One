
const _boxContainer = document.getElementById("boxContainer");
const _range = document.getElementById("range");
const _color = document.getElementById("color");

var color = _color.value;
var rangeValue = 5;
var boxCount = Math.pow(rangeValue, 2);
var array_boxs = [];
var dataset_index_Array = [];
var hasBoxCount = 0;

function clickedBox(element) {
  element.style.background = color;
  const index = element.dataset.index;

  function addToArrayBox() {
    dataset_index_Array.push(index);
    dataset_index_Array = [...new Set(dataset_index_Array)];
  }
  addToArrayBox();

  if (dataset_index_Array.length === hasBoxCount) {
    dataset_index_Array.forEach((dataset_index, i) => {
      for (let ii = 0; ii < boxCount; ii++) {
        if (Number(dataset_index) === ii) {
          setTimeout(() => {
            _boxContainer.children[ii].style.background = "white";
            setTimeout(() => {
              if (dataset_index_Array.length - 1 === i) {
                winGame();
              }
            }, [500]);
          }, [150 * i]);
        }
      }
    });
  }
}

function changeRange(element) {
  rangeValue = element.value;
  boxCount = Math.pow(rangeValue, 2);

  dataset_index_Array = [];
  generateRandomArray();
  cleanBoard();
  _boxContainer.style.gridTemplateColumns = `repeat(${rangeValue}, auto)`;
  renderBoard();
}

function changeColor(element) {
  color = element.value;
}

// |||  Rander  ||| //
const renderBoard = () => {
  hasBoxCount = 0;
  array_boxs.forEach((e, i) => {
    var box = document.createElement("div");

    if (e === 1) {
      hasBoxCount++;
      box.classList.add("box");
      box.setAttribute("onclick", "clickedBox(this)");
      box.setAttribute("data-index", `${i}`);
      box.style.cursor = "pointer";
    }

    _boxContainer.appendChild(box);
  });
};

// |||  Remove  ||| //
const cleanBoard = () => {
  while (_boxContainer.firstChild) {
    _boxContainer.firstChild.remove();
  }
};

// |||  Random  ||| //
const generateRandomArray = () => {
  array_boxs = [];
  for (let i = 0; i < boxCount; i++) {
    var randomValue = Math.floor(Math.random() * 2);
    array_boxs.push(randomValue);
  }
};

// |||  Win  ||| //
const winGame = () => {
  dataset_index_Array = [];
  generateRandomArray();
  cleanBoard();
  _boxContainer.style.gridTemplateColumns = `repeat(${rangeValue}, auto)`;
  renderBoard();
};

window.onload = () => {
  generateRandomArray();
  renderBoard();
};
