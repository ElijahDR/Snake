class Fruit{
    constructor(){
        this.position = createVector(10, 10);
    }

    place(){
        var upper = w;
        var lower = 0;
        var x = getRandomInt(lower, upper);
        upper = h;
        var y = getRandomInt(lower, upper);
        this.position = createVector(x, y);
    }

    display(){
        fill(fruitColor);
        ellipse(this.position.x * block, this.position.y * block, block, block);
    }
}
