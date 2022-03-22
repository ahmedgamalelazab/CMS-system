(async () => {
  console.log("called code");

  function chartsControl() {
    var charts = document.querySelectorAll("[data-bss-chart]");

    for (var chart of charts) {
      chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
    }
  }

  document.addEventListener("DOMContentLoaded", chartsControl, false);
})();
