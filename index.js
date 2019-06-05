let cases = [...document.querySelectorAll('.case')];
let turn_visual = document.querySelector('#turn');
let error_visual = document.querySelector('#error');
let victory_visual = document.querySelector('#victory');
let won_where = document.querySelector('#wonWhere');
let reset_button = document.querySelector('button');

let turn = 'O';
let symbol_array = ['?', '?', '?', '?', '?', '?', '?', '?', '?'];
let disabled = false; //prevents the players from playng when it's over while waiting for reset

//Handles the click on the squares
cases.forEach( e => {
    e.addEventListener('click', () => {        
        if(!disabled){
            if(e.dataset.symbol == '?'){
                e.dataset.symbol = turn;
                updateArray(e);
                updateVisual(e);
                checkWin();
                turn == 'O' ? turn = 'X' : turn = 'O';
            } else {
                displayError();
            }
        }
    });
});

//Handles reset button
reset_button.addEventListener('click', () => {
    reset();
});

let updateArray = (e) => {    
    let index  = cases.indexOf(e);
    symbol_array[index] = turn;
}

let updateVisual = (e) => {
    e.childNodes[0].innerText = e.dataset.symbol;
    turn == 'O' ? turn_visual.innerText = 'X' : turn_visual.innerText = 'O';
}


let displayError = () => {
    error_visual.classList.remove('d-none');
    setTimeout(() => {
        error_visual.classList.add('d-none');
    }, 1500);
}

let displayVictory = () => {
    victory_visual.classList.remove('d-none');
    victory_visual.childNodes[0].innerText = turn;
}

let reset = () => {
    cases.forEach( e => {
        e.childNodes[0].innerText = ''
        e.dataset.symbol = '?';
    });
    victory_visual.classList.add('d-none');
    symbol_array.fill('?');
    disabled = false;
}

let checkWin = () => {
    let won = false;
    let where = '';

    //creates a more "board-like" array to check combinations
    let array = Array.from(symbol_array);
    let board = [];
    for(let i = 0; i < 3; i++){
        board.push(array.splice(0, 3))
    }
    
    //check horizontals
    for(let i = 0; i < 3; i++){
        if(board[i].every( value => value == board[i][0])){
            if(!won && (board[i][0] != '?')){
                //checking whether or not one item is "empty" (= '?')
                won = true;
                where = `Horizontal: row ${i+1}`;
            }
        }
    }

    //check verticals
    for (let i = 0; i < 3; i++){
        if(board[0][i] == board[1][i] && board[0][i] == board[2][i]){
            if(!won && (board[0][i] != '?')){
                //checking whether or not one item is "empty" (= '?')
                won = true;
                where = `Vertical: column ${i+1}`;
            }
        }
    }

    //check diagonals (only 2 diagonals possible, being that the board is 3x3 and cannot change)
    if((board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||(board[0][2] == board[1][1] && board[0][2] == board[2][0])){
        if(!won && board[1][1] != '?'){
            //checking whether or not one item is "empty" (= '?')
            won = true;
            where = `Diagonal`;
        }
    }

    if(won){
        won_where.innerText = where;
        displayVictory();
        disabled = true; //prevents the players from playng while it's over
        setTimeout(() => {
            reset();
        }, 1500);
    }
}