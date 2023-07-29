let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

let player = ['X','O'];
let available = [];
let currentPlayer;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  currentPlayer = floor(random(player.length)); //index to player array
  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++){
      available.push([i,j]);
    }
}

function equals3(a,b,c){
  return (a==b && b==c && a != '');
}

function nextTurn(){
  let l = floor(random(available.length));
  let spot = available.splice(l,1)[0];
  board[spot[0]][spot[1]] = player[currentPlayer];
  currentPlayer = (currentPlayer + 1) % player.length;
}

function checkWinner(w,h){
  let winner = null;
  stroke(255, 0, 0); // red stroke
  // horizontal
  for(let i = 0 ; i < 3;i++){
    if(equals3(board[i][0],board[i][1],board[i][2])){
      winner = board[i][0];
      let x = h/2;
      let y = w * i + w/2;
      line (x, y,5*x,y); 
    }
  }
  // vertical
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
  //diagonal
  if(equals3(board[0][0],board[1][1],board[2][2])){
    winner = board[0][0];
    line (h/2,w/2,x,y); 
  }
  if(equals3(board[0][2],board[1][1],board [2][0])){
    winner = board[0][2];
    line (x,w/2,h/2,y); 
  }

  // re-draw symbols so red line doesn't erase them
  stroke(0);
  drawBoard(w,h);

  if(winner == null && available.length == 0){
    return 'tie';
  }
  else {
    return winner;
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  let w = width/3;
  let h = height/3;

  // draw grid 
  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);

  drawBoard(w,h);

  let result = checkWinner(w,h);
  if (result != null){
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') 
        resultP.html("Tie!");
      else 
        resultP.html(`${result} wins!`);
  }
  else {
      nextTurn();
  }  
}

function drawBoard(w,h){

  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++){
      let x = w * j + w/2;
      let y = h * i + h/2;
      let spot = board[i][j];
      textSize(32);
      if (spot == player[0]){
        xr = w / 4;
        line (x - xr, y-xr, x + xr, y + xr); 
        line(x + xr, y - xr, x -xr, y + xr);
      }
      else if(spot == player[1]){
        noFill();
        ellipse(x,y,w/2);
      }
    }
}