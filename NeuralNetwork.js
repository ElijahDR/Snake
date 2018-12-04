class NeuralNetwork{
    constructor(id){
        this.id = id;
        this.snake = new Snake();
        this.totalMoves = 0;
        this.score = 0;

        this.layers = [];
        this.moves = maxMoves;

        var inputLayer = new NeuralLayer(noOfInputs);
        inputLayer.makeInput(this.snake);
        this.layers.push(inputLayer);
        this.inputLayer = inputLayer;

        for (var i = 0; i < noOfHiddenLayers; i++){
            var hiddenLayer = new NeuralLayer(noOfHiddenNeurons);
            this.layers.push(hiddenLayer);
        }

        var outputLayer = new NeuralLayer(noOfOutputs);
        this.outputLayer = outputLayer;
        this.layers.push(outputLayer);

        for (var i = 0; i < this.layers.length - 1; i++){
            this.layers[i].connectTo(this.layers[i + 1]);
        }
    }

    setHiddenLayers(layers, neurons){
        var inputLayer = new NeuralLayer(noOfInputs);
        inputLayer.makeInput(this.snake);
        this.layers.push(inputLayer);
        this.inputLayer = inputLayer;

        for (var i = 0; i < layers; i++){
            var hiddenLayer = new NeuralLayer(neurons);
            this.layers.push(hiddenLayer);
        }

        var outputLayer = new NeuralLayer(noOfOutputs);
        this.outputLayer = outputLayer;
        this.layers.push(outputLayer);

        for (var i = 0; i < this.layers.length - 1; i++){
            this.layers[i].connectTo(this.layers[i + 1]);
        }
    }

    setID(id){
        this.id = id;
    }

    getID(){
        return this.id;
    }

    runOnce(){
        if (!this.snake.alive || this.moves == 0){
            this.reset();
            resetGame();
            return;
        }
        this.snake.display();
        this.snake.fruit.display();
        this.snake.update();
        if (this.snake.score > this.score){
            this.moves = maxMoves;
            this.score = this.snake.score;
        }
        var move = this.getMove();
        this.snake.direction = move;
        this.moves--;
        this.totalMoves++;
        this.fitness = this.calcFitness();
    }

    run(loops){
        this.best = 0;
        var totalFitness = 0;
        for (var i = 0; i < loops; i++){
            this.reset();
            while (true){
                this.snake.update();
                if (this.snake.score > this.score){
                    this.score = this.snake.score;
                    this.moves = maxMoves;
                }
                var move = this.getMove();
                this.snake.direction = move;
                this.moves--;
                this.totalMoves++;

                if (!this.snake.alive || this.moves == 0){
                    if (this.calcFitness() > this.best){
                        this.best = this.calcFitness();
                    }
                    totalFitness += this.calcFitness();
                    break;
                }
            }
        }
        var fitness = totalFitness / loops;
        this.fitnessFromRun = fitness;
    }

    calcFitness(){
        return (this.totalMoves * movePoints) + (this.score * fruitPoints);
    }

    reset(){
        this.moves = maxMoves;
        this.totalMoves = 0;
        this.score = 0;
        this.snake.reset();
    }

    getMove(){
        var data = this.outputLayer.getData();
        this.data = data;
        //console.log(data);
        var largest = 0;
        var index = 0;
        for (var i = 0; i < data.length; i++){
            if (data[i] > largest){
                largest = data[i];
                index = i;
            }
        }

        if (index == 0){
            return r;
        } else if (index == 1){
            return d;
        } else if (index == 2){
            return l;
        } else if (index == 3){
            return u;
        }
    }

    getWeights(){
        var weights = [];
        for (var i = 0; i < this.layers.length - 1; i++){
            weights[i] = this.layers[i].getWeights();
        }
        this.weights = weights;
        return weights;
    }

    getBiases(biases){
        var biases = [];
        for (var i = 1; i < this.layers.length; i++){
            biases.push(this.layers[i].getBiases());
        }
        this.biases = biases;
        return biases;
    }

    getWB(){
        var data = [];
        data[0] = this.getWeights();
        data[1] = this.getBiases();
        return data;
    }

    setWeights(weights){
        //console.log("WEIGHTS");
        //console.log(weights);
        for (var i = 0; i < this.layers.length - 1; i++){
            this.layers[i].setWeights(weights[i]);
        }
    }

    setBiases(biases){
        for (var i = 1; i < this.layers.length; i++){
            this.layers[i].setBiases(biases[i - 1]);
        }
    }
}
