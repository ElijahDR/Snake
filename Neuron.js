class Neuron{
    constructor(){
        this.outputConnections = [];
        this.inputConnections = [];
        this.bias = getRandom(-1, 1);

        this.input = false;
        this.source = [];
    }

    setInput(source, snake){
        this.input = true;
        this.source = source;
        this.snake = snake;
    }

    setBias(bias){
        this.bias = bias;
    }

    getBias(){
        return this.bias;
    }

    getWeight(){
        var weights = [];
        for (var i = 0; i < this.outputConnections.length; i++){
            weights[i] = this.outputConnections[i].getWeight();
        }
        this.weights = weights;
        return this.weights;
    }

    setDraw(x, y){
        this.drawX = x;
        this.drawY = y;
    }

    setLine(x, y){
        this.lineX = x;
        this.lineY = y;
    }

    addOutputConnection(connection){
        this.outputConnections.push(connection);
    }

    addInputConnection(connection){
        this.inputConnections.push(connection);
    }

    getData(){
        if (this.input == true){
            return this.snake.getData(this.source);
        } else {
            var total = 0;
            for (var i = 0; i < this.inputConnections.length; i++){
                var conn = this.inputConnections[i];
                var data = conn.getData();
                total += data;
            }
            var answer = sigmoid(total);
            return answer;
        }
    }

    setWeights(weights){
        for (var i = 0; i < this.outputConnections.length; i++){
            this.outputConnections[i].setWeight(weights[i]);
        }
    }
}
