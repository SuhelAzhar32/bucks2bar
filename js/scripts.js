// window.onload = function () {
  document.addEventListener("DOMContentLoaded", function () {

    // iput with id username on change
    document.getElementById("username").addEventListener("input", function () {
        var username = document.getElementById("username").value;
        // regex to check if username has at least 1 capital letter, 1 special character and minimum length is 8
        var regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
        if (regex.test(username)) {
            document.getElementById("username").style.borderColor = "green";
        } else {
            document.getElementById("username").style.borderColor = "red";
        }
    });

    function getMonthlyData() {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

      const incomeData = months.map((month) => {
        const incomeInput = document.getElementById(`${month}-income`);
        return incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
      });

      const expensesData = months.map((month) => {
        const expensesInput = document.getElementById(`${month}-expenses`);
        return expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
      });

      return { incomeData, expensesData };
    }

    function renderChart(chart) {
      const { incomeData, expensesData } = getMonthlyData();
      chart.data.datasets[0].data = incomeData;
      chart.data.datasets[1].data = expensesData;
      chart.update();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Monthly Income",
            data: [],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Monthly Expenses",
            data: [],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    document.getElementById("chat-tab").addEventListener("click", function () {
      renderChart(myChart);
    });

    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        renderChart(myChart);
      });
    });

    // Initial render to ensure the chart is displayed when the page loads
    renderChart(myChart);

    // Download the canvas as an image
    document.getElementById("download").addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = document.getElementById("myChart").toDataURL("image/png");
      link.download = "chart.png";
      link.click();
    });
  });
// };
