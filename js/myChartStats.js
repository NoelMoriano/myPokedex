const elementChart = document.querySelector("#myChart");

const setDataChart = (dataStats, colorType) => {
  const _dataByType = dataByType[colorType.name];

  const data = {
    labels: [
      "HP",
      "ATAQUE",
      "DEFENSA",
      "ATAQUE ESPECIAL",
      "DEFENSA ESPECIAL",
      "VELOCIDAD",
    ],
    datasets: [
      {
        label: "Nivel",
        data: dataStats,
        fill: true,
        backgroundColor: _dataByType.color_rgba,
        borderColor: _dataByType.color_solid,
        pointBackgroundColor: _dataByType.color_solid,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: _dataByType.color_solid,
      },
    ],
  };

  const configChart = {
    type: "radar",
    data: data,
    options: {
      aspectRatio: 2,
      responsive: true,
      elements: {
        line: {
          borderWidth: 2,
        },
      },
    },
  };

  const myChart = new Chart(elementChart, configChart);
};
