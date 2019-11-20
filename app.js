/*
GAME RULES:
1.  THIS GAME IS PLAYED WITH TWO PLAYERS IN ROUNDS
2.  ON PLAYER TURNS,
    A.  PLAYER ROLLS DICE
    B.  IF THEY ROLL A 1, TURN IS OVER, SCORE IS RESET AND NEXT PLAYER TURN BEGINS
    C.  IF PLAYER ROLLS ANYTHING OTHER THAN A 1, EACH ROLL WILL BE RECORDED TO THEIR CURRENT SCORE
    D.  PLAYER CAN ROLL DICE AS MANY TIMES AS THEY DESIRE PROVIDED THEY DO NOT ROLL A 1 ON ANY TURN THEY TAKE FOR A ROUND
    E.  IF A PLAYER HAS NOT ROLLED A 1, BUT WOULD LIKE TO CONCLUDE THEIR TURN AND SAVE THEIR POINTS, THEY CAN HOLD THEIR CURRENT SCORE WHILE PASSING ROUND TO NEXT PLAYER
3.  FIRST PLAYER TO REACH A SCORE OF 100 OR MORE, WINS THE GAME!
*/

//Declare variables
let scores, roundScore, activePlayer;

//Start New Game
newGame();

//Dice Behavior on ROLL

document.querySelector('.btn-roll').addEventListener('click', () => {
    //Get random number
    const randomDice = Math.floor(Math.random() * 6) + 1;
    //Display result
    const diceDisplay = document.querySelector('.dice');
    diceDisplay.style.display = 'block';
    diceDisplay.src = 'dice-' + randomDice + '.png';
    //Update round score if rolled # NOT 1
    if (randomDice !== 1){
        //Add score to roundTotal
        roundScore += randomDice;
        //Display roundTotal
        document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
        //Switch players if 1 is rolled
    } else {
        nextPlayer();
    }
});

//Dice Behavior on HOLD
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (playingGame) {
        //Add roundScore to globalScore id="score-0"
        score[activePlayer] += roundScore;
        //Update DOM
        document.querySelector('#score-' + activePlayer).innerHTML = score[activePlayer];
        //Did player win?
    if (score[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playingGame = false;
    } else {
        nextPlayer();
    }
}
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

//New Game
document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    playingGame = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}















