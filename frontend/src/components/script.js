new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: ["15,000", "20,000", "40,000", "50,000"],
      datasets: [
        {
          label: "Monthly",
          backgroundColor: "#3e95cd",
          data: [5000,7000,9800,10000]
        }, {
          label: "Yearly",
          backgroundColor: "#8e5ea2",
          data: [15000,22000,25000,30000]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Population growth (millions)'
      }
    }
});