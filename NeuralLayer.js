class NeuralLayer{
    constructor(count){
        this.neurons = [];
        for (var i = 0; i < count; i++){
            var neuron = new Neuron();
            this.neurons.push(neuron);
        }
    }

    connectTo(toLayer){
        for (var i = 0; i < this.neurons.length; i++){
            for (var j = 0; j < toLayer.neurons.length; j++){
                var connection = new Connection(this.neurons[i], toLayer.neurons[j]);
                this.neurons[i].addOutputConnection(connection);
                toLayer.neurons[j].addInputConnection(connection);
            }
        }
    }

    makeInput(snake){
        for (var i = 0; i < this.neurons.length; i++){
            this.neurons[i].setInput(i, snake);
        }
    }

    getData(){
        var max = Number.NEGATIVE_INFINITY;
        var answers = Array();

        for (var i = 0; i < this.neurons.length; i++){
            var answer = this.neurons[i].getData();
            answers[i] = answer;
        }

        for (var i = 0; i < answers.length; i++){
            if (answers[i] > max){
                max = answers[i];
            }
        }

        var sum = 0;
        for (var i = 0; i < answers.length; i++){
            var output = Math.exp(answers[i] - max);
            answers[i] = output;
            sum += output;
        }

        for (var i = 0; i < answers.length; i++){
            answers[i] /= sum;
        }

        return answers;
    }

    getWeights(){
        var weights = [];
        for (var i = 0; i < this.neurons.length; i++){
            weights[i] = this.neurons[i].getWeight();
        }
        this.weights = weights;
        return weights;
    }

    getBiases(){
        var biases = [];
        for (var i = 0; i < this.neurons.length; i++){
            biases[i] = this.neurons[i].getBias();
        }
        this.biases = biases;
        return biases;
    }

    setWeights(weights){
        for (var i = 0; i < this.neurons.length; i++){
            this.neurons[i].setWeights(weights[i]);
        }
    }

    setBiases(biases){
        for (var i = 0; i < this.neurons.length; i++){
            this.neurons[i].setBias(biases[i]);
        }
    }
}
