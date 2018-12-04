var world;

function setup() {
    var canvas = createCanvas(1000, 1000);
    canvas.parent("snakeGame");

    fruitColor = color(255, 0, 0);
    gameColor = color(0, 0, 0);
    snakeColor = color(255, 255, 255);

    gui = createGui('p5.gui');

    sliderRange(0, 1, 0.01);
    gui.addGlobals('mutationRate

    sliderRange(1, 50, 1);
    gui.addGlobals('noOfRuns');

    sliderRange(1, 200, 1);
    gui.addGlobals('movePoints');

    sliderRange(1, 200, 1);
    gui.addGlobals('fruitPoints');

    // sliderRange(0, 3, 1);
    // gui.addGlobals('noOfHiddenLayers');

    fill(gameColor);
    rect(0, 0, gameWidth, gameHeight);


    r = createVector(1, 0);
    d = createVector(0, 1);
    l = createVector(-1, 0);
    u = createVector(0, -1);
    directions.push(r, d, l, u);

    ellipseMode(CORNER);

    frameRate(10);

    world = new World();
    world.run();

    //blankGraph();
}

function draw() {
    // snake.update();
    // snake.display();
    if (view){
        var network = world.getNetwork(viewing);
        if (oldViewing != viewing){
            resetGame();
            oldViewing = viewing;
            if (show){
                showNetwork(network);
            }
        }
        currentInfo(network);
        world.display(viewing);
    }
    if (frameCount % 2 == 0 && autoEvolve){
        evolve(1);
    }

}

function keyPressed() {
    if (key == 'P' || key == 'p'){
        if (view){
            view = false;
        } else if (!view){
            view = true;
        }
    }
    if (key == 'S' || key == 's'){
        if (viewing > 0){
            viewing--;
        }
    }
    if (key == 'D' || key == 'd'){
        if (viewing < noOfNetworks - 1){
            viewing++;
        }
    }
    if (key == 'W' || key == 'w'){
        evolve(1);
    }
    if (key == 'L' || key == 'l'){
        if (logInfo){
            logInfo = false;
        } else {
            logInfo = true;
        }
    }
    if (key == 'G' || key == 'g'){
        if (autoEvolve){
            document.getElementById("autoevolvestatus").innerHTML = "off";
            autoEvolve = false;
        } else {
            document.getElementById("autoevolvestatus").innerHTML = "on";
            autoEvolve = true;
            logInfo = false;
        }
    }
    // if(keyCode == UP_ARROW) {
    //     snake.direction = u;
    // } else if (keyCode == DOWN_ARROW) {
    //     snake.direction = d;
    // } else if (keyCode == RIGHT_ARROW){
    //     snake.direction = r;
    // } else if (keyCode == LEFT_ARROW){
    //     snake.direction = l;
    // }
}

function evolve(n){
    for (var i = 0; i < n; i++){
      world.evolve();
    }
    showNetwork(world.getNetwork(0));
    showProgress();
    get10Point(generationBests);
    viewing = 0;
}

function getRandomInt(lower, upper){
    return Math.floor(Math.random() * upper) + lower;
}

function getRandom(min, max) {
    var random = Math.random() * (max - min) + min;
    return random;
}

function sigmoid(data){
    return 1 / (1 + Math.pow(Math.E, -data));
}

function resetCanvas(){
    clear();
    fill(gameColor);
    rect(0, 0, gameWidth, gameHeight);
}

function resetGame(){
    fill(gameColor);
    rect(0, 0, gameWidth, gameHeight);
}

function showNetwork(network){

    var padding = 10;

    var neuronSize = 15;

    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(gameWidth, 0, networkWidth + neuronSize + (padding * 5) + networkTextWidth, networkHeight);

    var spacingW = networkWidth / (network.layers.length - 1);
    stroke(0, 0, 0);
    strokeWeight(1);

    var weights = network.getWeights();
    var startX = gameWidth + networkTextWidth + padding;
    var startY = padding;
    var maxNeurons = 0;
    for (var i = 0; i < network.layers.length; i++){
        if (network.layers[i].neurons.length > maxNeurons){
            maxNeurons = network.layers[i].neurons.length;
        }
    }
    var spacingH = (networkHeight - (padding * 2)) / maxNeurons;
    for (var i = 0; i < network.layers.length; i++){
        startY = (networkHeight - (network.layers[i].neurons.length * spacingH)) / 2;
        fill(255, 255, 255);
        for (var j = 0; j < network.layers[i].neurons.length; j++){
            ellipse(startX + (i * spacingW), startY + (j * spacingH), neuronSize, neuronSize);
            ellipse(startX + (i * spacingW) + neuronSize / 2, startY + (j * spacingH) + neuronSize / 2, 1, 1);
            network.layers[i].neurons[j].setDraw(startX + (i * spacingW), startY + (j * spacingH));
            network.layers[i].neurons[j].setLine(startX + (i * spacingW) + neuronSize / 2, startY + (j * spacingH) + neuronSize / 2);
            if (i == 0){
                fill(0, 0, 0);
                text(inputTitles[j], gameWidth + padding, startY + (j * spacingH) + padding);
                fill(255, 255 ,255);
            }

            if (i == network.layers.length - 1){
                fill(0, 0, 0);
                text(outputTitles[j], gameWidth + networkWidth + networkTextWidth + (3 * padding), startY + (j * spacingH) + padding);
                fill(255, 255 ,255);
            }
        }
    }

    for (var i = 0; i < network.layers.length - 1; i++){
        for (var j = 0; j < network.layers[i].neurons.length; j++){
            for (var k = 0; k < network.layers[i].neurons[j].outputConnections.length; k++){
                var connection = network.layers[i].neurons[j].outputConnections[k];
                var toNeuron = connection.toNeuron;
                var fromNeuron = connection.fromNeuron;
                var strokeW = map(connection.weight, -1, 1, 0.1, 4);
                strokeWeight(strokeW);
                if (Math.sign(connection.weight) === 1){
                    stroke(255, 0, 0);
                }
                if (Math.sign(connection.weight) === -1){
                    stroke(0, 0, 255);
                }
                line(fromNeuron.lineX, fromNeuron.lineY, toNeuron.lineX, toNeuron.lineY);
            }
        }
    }

    stroke(0, 0, 0);
    fill(0, 0, 0);
    strokeWeight(1);
}

function currentInfo(network){

    stroke(255, 255, 255);
    fill(255, 255, 255);
    rect(0, gameHeight, infoWidth, infoHeight);
    fill(0, 0, 0);
    stroke(0, 0, 0);

    var padding = 10;

    var startX = padding;
    var startY = gameHeight + (padding * 2);
    //
    // for (var i = 0; i < info.length; i++){
    //     text(info[i][0], startX, startY + (i * 40));
    // }
    text("Generation: " + (generationAverages.length) + "th", startX, startY);
    text("ID: " + network.id, startX, startY + 20);
    text("Place: " + (viewing + 1), startX, startY + 40);
    text("Fitness from Run: " + network.fitnessFromRun, startX, startY + 60);
    text("Current Fitness: " + network.fitness, startX, startY + 80);
}

function showProgress(){
    myChart.destroy();
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
            },
            {
                data: get10Point(generationBests),
                label: "Average",
                borderColor: "#00ff00",
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
    myChart.update();

}

function blankGraph(){
    myChart = new Chart(document.getElementById("graph"), {
        type: 'line',
        data: {
            labels: totalGens(),
            datasets: [{
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
            },
            {
                data: generationWorst,
                label: "Worst",
                borderColor: "#0000ff",
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

}

function totalGens(){
    var array = [];
    for (var i = 0; i < generationAverages.length; i++){
        array.push(i);
    }
    return array;
}

function averageArray(array){
    var total = 0;
    for (var i = 0; i < array.length; i++){
        total += array[i];
    }
    return total / array.length;
}

function get10Point(array){
    if (array.length < 10){
        return 0;
    }
    var returnData = [];
    var jump = array.length / 10;
    jump = Math.floor(jump);
    for (var i = 0; i < array.length; i+= jump){
        var section = [];
        for (var j = i; j < i + jump; j++){
            var item = array[j];
            if (!isNaN(item)){
                section.push(item);
            }
        }
        var average = averageArray(section);
        for (var j = i; j < i + jump; j++){
            returnData.push(average);
        }
    }

    return returnData;
}
