let colorarray = {};

function createColors() {
  colorarray = {};
  for (color in colors) {
    colorarray[color] = colors[color]['500'];
  }
};
createColors();
let chart = new Chart($("#circle"), {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: 'Material Pallete',
      data: Array(Object.keys(colorarray).length).fill((360 / Object.keys(colorarray).length)),
      backgroundColor: Object.values(colorarray),
      borderWidth: 0
    }]
  },
  options: {
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    },
    events: ['click'],

  }
});

$("#circle").click(
  function(evt) {
    var activePoints = chart.getElementAtEvent(evt);
    expandColor(Object.keys(colorarray)[activePoints[0]['_index']]);
  }
);
function displayColor(color) {
  $(".card").css("display", "block")
  $("#colorname")[0].innerText = color;
  $("#colorvalue")[0].innerText = colorarray[color];

}
function expandColor(color) {
  displayColor(color);
  if(!Object.keys(colors).includes(color)){
    return;
  }
  createColors();

  delete colorarray[color]
  for (newcolor in colors[color]) {
    colorarray[color + newcolor] = colors[color][newcolor];
  }
  let size = [];
  let oColors = [];
  let nColors = [];
  for(c in colorarray){

    if(Object.keys(colors).includes(c)){
      oColors.push(c);
    }
    else{
      nColors.push(c);
    }
  }
  for(i = 0; i < oColors.length; i++){
    size.push(180/oColors.length);
  }
  for(i = oColors.length; i < oColors.length+nColors.length; i++){
    size.push(180/nColors.length);
  }
  chart.data.labels = Object.keys(colorarray);
  chart.data.datasets.forEach((dataset) => {
    dataset.data = size;
    dataset.backgroundColor = Object.values(colorarray)
  });
  chart.options.rotation = (-0.5 * Math.PI) - (270 / 180 * Math.PI);
  chart.update();
}

function clearChart() {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}
