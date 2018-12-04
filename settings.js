var h = 20;
var w = 20;

var gui;

var gameWidth = 400;
var gameHeight = 400;
var networkHeight = 400;
var networkWidth = 400;
var networkTextWidth = 70;
var infoHeight = 200;
var infoWidth = gameWidth;

var block = gameWidth / w;

var directions = [];
var r, d, l, u;

var snake;

var view = true;
var show = true;
var autoEvolve = false;
var logInfo = false;

var fruitColor;
var gameColor;
var snakeColor;

var generationBests = [];
var generationAverages = [];
var generationWorst = [];

var mutationRate = 0.05;
var noOfHiddenNeurons = 14;
var noOfHiddenLayers = 0;
var noOfInputs = 13;
var noOfOutputs = 4;
var noOfNetworks = 200;
var noOfRuns = 10;
var maxMoves = 180;
var movePoints = 1;
var fruitPoints = 40;

var viewing = 0;
var oldViewing = -1;

var inputTitles = ["Fruit Right", "Body Right", "Wall Right", "Fruit Down", "Body Down", "Wall Down", "Fruit Left", "Body Left", "Wall Left", "Fruit Up", "Body Up", "Wall Up", "Bias"];
var outputTitles = ["Right", "Down", "Left", "Up"];
