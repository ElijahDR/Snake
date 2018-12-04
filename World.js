class World{
    constructor(){
        var gen = new Generation(noOfNetworks);
        this.current = gen;
    }

    run(){
        this.current.run(noOfRuns);
        this.ordered = this.current.order();
    }

    display(place){
        var id = this.ordered[place];
        this.current.runDisplay(id);
    }

    getNetwork(place){
        return this.current.networks[this.ordered[place]];
    }

    evolve(){
        var newNetworks = [];
        var randomCount = this.current.networks.length * 0.02;
        var keepCount = this.current.networks.length * 0.1;
        for (var i = 0; i < this.current.networks.length; i++){
            if (i < keepCount){
                var newBiases = [];
                var newWeights = [];

                var chosen = this.getRandonPlace();
                //console.log(chosen);

                var network = this.getNetwork(chosen);
                var data = network.getWB();
                var weights = data[0];
                var biases = data[1];

                var newNetwork = new NeuralNetwork(i);
                newNetwork.setWeights(weights);
                newNetwork.setBiases(biases);

                newNetworks.push(newNetwork);
            } else if (i < this.current.networks.length - randomCount){
                var chosen = this.getRandonPlace();
                //console.log(chosen);
                var mother = this.getNetwork(chosen);
                chosen = this.getRandonPlace();
                var father = this.getNetwork(chosen);

                var motherWeights = mother.getWeights();
                //console.log(motherWeights);
                var fatherWeights = father.getWeights();

                var motherBiases = mother.getBiases();
                var fatherBiases = father.getBiases();

                var newWeights = [];

                console.log(mutationRate);

                for (var j = 0; j < motherWeights.length; j++){
                    var newLayer = [];
                    var layerWeightsM = motherWeights[j];
                    var layerWeightsF = fatherWeights[j];
                    for (var k = 0; k < layerWeightsM.length; k++){
                        var newNeuron = [];
                        var neuronWeightsM = layerWeightsM[k];
                        var neuronWeightsF = layerWeightsF[k];

                        for (var l = 0; l < neuronWeightsM.length; l++){
                            var newConnection = 0;
                            var chance = getRandom(0, 1);
                            if (chance > (1 - mutationRate)){
                                newConnection = getRandom(-1, 1);
                            } else if (chance < ((1 - mutationRate) / 2)){
                                var value = neuronWeightsF[l];
                                newConnection = value;
                            } else {
                                var value = neuronWeightsM[l];
                                newConnection = value;
                            }
                            //console.log(newConnection);
                            newNeuron.push(newConnection);
                        }
                        newLayer.push(newNeuron);
                    }
                    newWeights.push(newLayer);
                }
                //console.log(newWeights);

                // var newBiases = [];
                // for (var j = 0; j < motherBiases.length; j++){
                //     var newLayer = [];
                //     var layerBiasesM = motherBiases[j];
                //     var layerBiasesF = fatherBiases[j];
                //     for (var k = 0; k < layerBiasesM.length; k++){
                //         var chance = getRandom(0, 1);
                //         if (chance > (1 - mutationRate)){
                //             newLayer[k] = getRandom(-1, 1);
                //         } else if (chance < ((1 - mutationRate) / 2 )){
                //             var value = layerBiasesF[k];
                //             newLayer[k] = value;
                //         } else {
                //             var value = layerBiasesM[k];
                //             newLayer[k] = value;
                //         }
                //     }
                //     newBiases.push(newLayer);
                // }

                var newNetwork = new NeuralNetwork(i);
                newNetwork.setWeights(newWeights);
                // newNetwork.setBiases(newBiases);
                newNetworks.push(newNetwork);
            } else {
                var newNetwork = new NeuralNetwork(i);
                newNetworks.push(newNetwork);
            }
        }

        var newGen = new Generation(1);
        newGen.setNetworks(newNetworks);
        this.current = newGen;
        this.run();
    }

    getRandonPlace(){
        var pool = [];
        for (var i = 0; i < this.current.networks.length; i++){
            var total = this.current.networks.length - i;
            for (var j = 0; j < total; j++){
                pool.push(i);
            }
        }
        return pool[Math.floor(Math.random()*pool.length)];
    }

    totalProbability(){
        var n = this.current.networks.length - 1;
        return (n * (n + 1)) / 2;
    }
}
