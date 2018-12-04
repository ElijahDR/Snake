class Generation{
    constructor(count){
        var networks = [];
        for (var i = 0; i < count; i++){
            var network = new NeuralNetwork(i);
            networks[i] = network;
        }
        this.networks = networks;
    }

    setNetworks(networks){
        this.networks = networks;
    }

    run(){
        var generationFitness = 0;
        var best = 0;
        var worst = 999999999999999999;
        for (var i = 0; i < this.networks.length; i++){
            this.networks[i].run(noOfRuns);
            generationFitness += this.networks[i].fitnessFromRun;
            if (this.networks[i].fitnessFromRun > best){
                best = this.networks[i].fitnessFromRun;
            }
            if (this.networks[i].fitnessFromRun < worst){
                worst = this.networks[i].fitnessFromRun;
            }
        }
        this.bestFitness = best;
        this.averageFitness = generationFitness / this.networks.length;
        this.worstFitness = worst;
        generationAverages.push(this.averageFitness);
        generationBests.push(this.bestFitness);
        generationWorst.push(this.worstFitness);
    }

    order(){
        var ids = [];
        var fitnesses = []
        var bests = [];
        for (var i = 0; i < this.networks.length; i++){
            var fitness = Number.NEGATIVE_INFINITY;
            var best = Number.NEGATIVE_INFINITY;
            var index = 0;
            var id = 0;
            for (var j = 0; j < this.networks.length; j++){
                var network = this.networks[j];
                if (network.fitnessFromRun > fitness && !ids.includes(network.id)){
                    fitness = network.fitnessFromRun;
                    index = j;
                    id = network.id;
                    best = network.best;
                }
            }
            ids.push(id);
            fitnesses.push(fitness);
            bests.push(best);
        }
        //console.log(ids);
        //console.log(fitnesses);
        //console.log(bests);
        this.ordered = ids;
        return ids;
    }

    runDisplay(id){
        var network = this.networks[id];
        if (!network.snake.alive){
            network.reset();
            resetGame();
        }
        network.runOnce();
    }
}
