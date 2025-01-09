document.addEventListener("DOMContentLoaded", () => {

  const sendEmailButton = document.getElementById("send-email");

  sendEmailButton.addEventListener("click", () => {
    const chartDataUrl = document
      .getElementById("myChart")
      .toDataURL("image/png");
    const email = document.getElementById("email-address").value;
    if (email) {
      fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, chartDataUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Email sent successfully!");
          } else {
            alert("Failed to send email.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while sending the email.");
        });
    }
  });

  const usernameInput = document.getElementById("username");
  const chartTab = document.getElementById("chat-tab");
  const downloadButton = document.getElementById("download");
  const ctx = document.getElementById("myChart").getContext("2d");

  const validateUsername = () => {
    const username = usernameInput.value;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
    usernameInput.style.borderColor = regex.test(username) ? "green" : "red";
  };

  const getMonthlyData = () => {
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

    const incomeData = months.map(
      (month) =>
        parseFloat(document.getElementById(`${month}-income`)?.value) || 0
    );
    const expensesData = months.map(
      (month) =>
        parseFloat(document.getElementById(`${month}-expenses`)?.value) || 0
    );

    return { incomeData, expensesData };
  };

  const renderChart = (chart) => {
    const { incomeData, expensesData } = getMonthlyData();
    chart.data.datasets[0].data = incomeData;
    chart.data.datasets[1].data = expensesData;
    chart.update();
  };

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

  usernameInput.addEventListener("input", validateUsername);
  chartTab.addEventListener("click", () => renderChart(myChart));

  document.querySelectorAll("input[type='text']").forEach((input) => {
    input.addEventListener("input", () => renderChart(myChart));
  });

  renderChart(myChart);

  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = document.getElementById("myChart").toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  });
});
