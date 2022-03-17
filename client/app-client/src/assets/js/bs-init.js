(() => {
  console.log("called code");
  var charts = document.querySelectorAll("[data-bss-chart]");

  for (var chart of charts) {
    chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
  }
  //   document.addEventListener(
  //     "DOMContentLoaded",
  //     function () {

  //       }
  //     },
  //     false
  //   );
})();
