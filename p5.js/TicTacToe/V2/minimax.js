function bestMove(){
    // AI Turn
    let bestScore = -Infinity;
    let move;
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++){
        // is there a spot available?
        if(board[i][j] == ''){
            board[i][j] = ai;
            let score = minimax(board,0,false);
            board[i][j] = '';
            if (score > bestScore){
                bestScore = score;
                move = {i,j};
            }   
        }
      }
      board[move.i][move.j] = ai;
      currentPlayer = human;
}

let scores = {
    X : 1,
    O : -1,
    tie : 0
}

function minimax(board,depth, isMaximazing){

    let res = checkMove();
    if(res !== null){
       return scores[res];
    }
    // Maximising player 'X'
    if (isMaximazing){
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++){ 
                if(board[i][j] == ''){
                    board[i][j] = ai;
                    let score = minimax(board,depth + 1,false);
                    board[i][j] = '';
                    bestScore = max(score,bestScore); // max() returns max between two numbers
                }
            } 
        return bestScore;
    }
    // Minimising player 'O'
    else{
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++){ 
                if(board[i][j] == ''){
                    board[i][j] = human;
                    let score = minimax(board,depth + 1,true);
                    board[i][j] = '';
                    bestScore = min(score,bestScore);
                }
            }
        return bestScore;
    }
}