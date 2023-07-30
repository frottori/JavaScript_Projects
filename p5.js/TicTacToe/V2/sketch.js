let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

let w;
let h;
let available = [];
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let turn = true;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  w = width/3;
  h = height/3;
  bestMove();
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[j][i] == '') {
      board[j][i] = human;
      currentPlayer = ai;
      if(checkMove() == null) //so when human wins the ai doesn't play
        bestMove();
    }
  }
}

function equals3(a,b,c){
  return (a==b && b==c && a != '');
}

// checks and draws winner's move
function checkWinner(){
  let winner = null;
  stroke(255, 0, 0); // red stroke for who wins

  // horizontal check
  for(let i = 0 ; i < 3;i++){
    if(equals3(board[i][0],board[i][1],board[i][2])){
      winner = board[i][0];
      let x = h/2;
      let y = w * i + w/2;
      line (x, y,5*x,y); 
    }
  }
  // vertical check
  for(let i = 0 ; i < 3;i++){
    if(equals3(board[0][i],board[1][i],board[2][i])){
      winner = board[0][i];
      let x = h * i + h/2;
      let y = w/2;
      line (x,y,x,5*y); 
    }
  }

  let x = h*2 + h/2;
  let y = w*2 + w/2;
  // 1st diagonal check
  if(equals3(board[0][0],board[1][1],board[2][2])){
    winner = board[0][0];
    line (h/2,w/2,x,y); 
  }
  // 2nd diagonal check
  if(equals3(board[0][2],board[1][1],board [2][0])){
    winner = board[0][2];
    line (x,w/2,h/2,y); 
  }
  // calculations of open spots so i know if it's a tie
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  // re-draw symbols 'X' or 'O' so red line is under them
  stroke(0);
  drawBoard();

  if(winner == null && openSpots == 0){
    return 'tie';
  }
  else {
    return winner;
  }
}

// only checks witout drawing (for minimax algorithm)
function checkMove(){
  let winner = null;

  // horizontal check
  for(let i = 0 ; i < 3;i++){
    if(equals3(board[i][0],board[i][1],board[i][2])){
      winner = board[i][0]; 
    }
  }
  // vertical check
  for(let i = 0 ; i < 3;i++){
    if(equals3(board[0][i],board[1][i],board[2][i])){
      winner = board[0][i];
    }
  }

  // 1st diagonal check
  if(equals3(board[0][0],board[1][1],board[2][2])){
    winner = board[0][0];
  }
  // 2nd diagonal check
  if(equals3(board[0][2],board[1][1],board [2][0])){
    winner = board[0][2];
  }
  // calculations of open spots so i know if it's a tie
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if(winner == null && openSpots == 0){
    return 'tie';
  }
  else {
    return winner;
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  // draw grid 
  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);

  drawBoard();
  
  //check winner and print who won
  let result = checkWinner();
  if (result != null){
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') 
        resultP.html("Tie!");
      else 
        resultP.html(`${result} wins!`);
  } 
}

function drawBoard(){

  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++){
      let x = w * j + w/2;
      let y = h * i + h/2;
      let spot = board[i][j];
      textSize(32);
      let r = w/4;
      if (spot == ai){
        line (x - r, y-r, x + r, y + r); 
        line(x + r, y - r, x -r, y + r);
      }
      else if(spot == human){
        noFill();
        ellipse(x,y,r*2);
      }
    }
}