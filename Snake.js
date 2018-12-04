class Snake{
    constructor(){
        this.positions = new Array();
        this.position = createVector(10, 10);
        this.headPosition = this.position;
        this.oldPosition = createVector(10, 10);
        this.positions.push(this.position);
        this.tailLength = 5;
        this.score = 0;
        var fruit = new Fruit();
        this.fruit = fruit;
        this.fruitPlace();

        this.direction = d;

        this.alive = true;
    }

    update(){
        if (this.alive == false){
            return;
        }
        this.move();
        this.updateInfo();
        this.checkDead();
        this.checkFood();
    }

    move(){
        if (this.positions.length == this.tailLength){
            this.oldPosition = createVector(this.positions[0].x, this.positions[0].y);
            this.positions.splice(0, 1);
        }

        var newPosition = createVector(this.headPosition.x + this.direction.x, this.headPosition.y + this.direction.y);
        if (newPosition.x == w || newPosition.x < 0 || newPosition.y == h || newPosition.y < 0){
            this.alive = false;
            return;
        }
        this.positions.push(newPosition);
        this.headPosition = this.positions[this.positions.length - 1];
    }

    checkFood(){
        if (this.headPosition.x == this.fruit.position.x && this.headPosition.y == this.fruit.position.y){
            this.score++;
            this.tailLength++;
            this.fruitPlace();
            this.fruit.display();
        }
    }

    checkDead(){
        for (var i = 0; i < this.positions.length; i++){
            for (var j = 0; j < this.positions.length; j++){
                if (i == j){
                    continue;
                }
                if (this.positions[i].x == this.positions[j].x && this.positions[i].y == this.positions[j].y){
                    this.alive = false;
                }
            }
        }
    }

    display(){
        if (this.dead){
            return;
        }
        fill(snakeColor);
        for (var i = 0; i < this.positions.length; i++){
            rect(this.positions[i].x * block, this.positions[i].y * block, block, block);
        }
        fill(gameColor);
        rect(this.oldPosition.x * block, this.oldPosition.y * block, block, block)
    }

    fruitPlace(){
        this.fruit.place();
        var overlap = true;
        while (true){
            for (var i = 0; i < this.positions.length; i++){
                if (this.fruit.position.x == this.positions[i].x && this.fruit.position.y == this.positions[i].y){
                    overlap = false;
                }
            }
            if (!overlap){
                this.fruit.place();
                overlap = true;
                continue;
            } else {
                break;
            }
        }
    }

    updateInfo(){
        var info = [];
        info[0] = [0, w*h, 0];
        //console.log(this.fruit);
        // look right
        if (this.fruit.position.y == this.headPosition.y && this.fruit.position.x > this.headPosition.x){
            info[0][0] = this.fruit.position.x - this.headPosition.x;
        }
        for (var i = 0; i < this.positions.length; i++){
            if (this.positions[i].y == this.headPosition.y && this.positions[i].x > this.headPosition.x){
                if (this.positions[i].x - this.headPosition.x < info[0][1]){
                    info[0][1] = (this.positions[i].x - this.headPosition.x);
                }
            }
        }
        if (info[0][1] == w*h){
            info[0][1] = 0;
        }
        info[0][2] = w - this.headPosition.x;

        info[1] = [0, w*h, 0];
        // look down
        if (this.fruit.position.x == this.headPosition.x && this.fruit.position.y > this.headPosition.y){
            info[1][0] = this.fruit.position.y - this.headPosition.y;
        }
        for (var i = 0; i < this.positions.length; i++){
            if (this.positions[i].x == this.headPosition.x && this.positions[i].y > this.headPosition.y){
                if (this.positions[i].y - this.headPosition.y < info[1][1]){
                    info[1][1] = (this.positions[i].y - this.headPosition.y);
                }
            }
        }
        if (info[1][1] == w*h){
            info[1][1] = 0;
        }
        info[1][2] = h - this.headPosition.y;

        info[2] = [0, w*h, 0];
        // look left
        if (this.fruit.position.y == this.headPosition.y && this.fruit.position.x < this.headPosition.x){
            info[2][0] = this.headPosition.x - this.fruit.position.x;
        }
        for (var i = 0; i < this.positions.length; i++){
            if (this.positions[i].y == this.headPosition.y && this.positions[i].x < this.headPosition.x){
                if (this.headPosition.x - this.positions[i].x < info[2][1]){
                    info[2][1] = (this.headPosition.x - this.positions[i].x);
                }
            }
        }
        if (info[2][1] == w*h){
            info[2][1] = 0;
        }
        info[2][2] = this.headPosition.x;

        info[3] = [0, w*h, 0];
        // look up
        if (this.fruit.position.x == this.headPosition.x && this.fruit.position.y < this.headPosition.y){
            info[3][0] = this.headPosition.y - this.fruit.position.y;
        }
        for (var i = 0; i < this.positions.length; i++){
            if (this.positions[i].x == this.headPosition.x && this.positions[i].y < this.headPosition.y){
                if (this.headPosition.y - this.positions[i].y1 < info[3][1]){
                    info[3][1] = (this.headPosition.y - this.positions[i].y);
                }
            }
        }
        if (info[3][1] == w*h){
            info[3][1] = 0;
        }
        info[3][2] = this.headPosition.y;

        // bias
        info[4] = [];
        info[4][0] = 1;

        if (logInfo){
            console.log(info);
        }
        this.info = info;
    }

    getData(i){
        return this.info[Math.floor(i / 3)][i % 3];
    }

    reset(){
        this.positions = new Array();
        this.position = createVector(10, 10);
        this.headPosition = this.position;
        this.oldPosition = createVector(10, 10);
        this.positions.push(this.position);
        this.tailLength = 5;
        this.score = 0;
        var fruit = new Fruit();
        this.fruit = fruit;
        this.fruitPlace();

        this.direction = d;

        this.alive = true;
    }
}
