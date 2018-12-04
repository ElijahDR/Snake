class Connection{
    constructor(fromNeuron, toNeuron){
        this.weight = getRandom(-1, 1);
        this.fromNeuron = fromNeuron;
        this.toNeuron = toNeuron;
    }

    setWeight(weight){
        this.weight = weight;
    }

    getData(){
        return this.fromNeuron.getData() * this.weight;
    }

    getWeight(){
        return this.weight;
    }
}
