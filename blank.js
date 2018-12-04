myChart = new Chart(document.getElementById("graph"), {
    type: 'line',
    data: {
        labels: totalGens(),
        datasets: [{
            data: generationWorst,
            label: "Worst",
            borderColor: "#0000ff",
            fill: false
        },
        {
            data: generationAverages,
            label: "Average",
            borderColor: "#00ff00",
            fill: false
        },
        {
            data: generationBests,
            label: "Best",
            borderColor: "#ff0000",
            fill: false
        }]
    },
    options: {
        animation: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,
                    beginAtZero: true
                }
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        },
        title: {
            display: true,
            text: 'Neural Network Progress'
        }
    }
});
