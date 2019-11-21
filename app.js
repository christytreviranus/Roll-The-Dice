/*
GAME RULES:
1.  THIS GAME IS PLAYED WITH TWO PLAYERS IN ROUNDS
2.  ON PLAYER TURNS,
    A.  PLAYER ROLLS DICE
    B.  IF THEY ROLL A 1, TURN IS OVER, SCORE IS RESET AND NEXT PLAYER TURN BEGINS
    C.  IF PLAYER ROLLS ANYTHING OTHER THAN A 1, EACH ROLL WILL BE RECORDED TO THEIR CURRENT SCORE
    D.  PLAYER CAN ROLL DICE AS MANY TIMES AS THEY DESIRE PROVIDED THEY DO NOT ROLL A 1 ON ANY TURN THEY TAKE FOR A ROUND
    E.  IF A PLAYER HAS NOT ROLLED A 1, BUT WOULD LIKE TO CONCLUDE THEIR TURN AND SAVE THEIR POINTS, THEY CAN HOLD THEIR CURRENT SCORE WHILE PASSING ROUND TO NEXT PLAYER
    F.  IF A PLAYER ROLLS TWO 6'S IN A ROW, THEY LOSE ALL THEIR GAME POINTS AND THEIR TURN IS ENDED
3.  PLAYERS CAN SET THE WINNING SCORE.  WHOEVER REACHES THIS SCORE FIRST, WINS THE GAME!

*/


//Declare variables
let scores, roundScore, activePlayer, lastRolled, winningScore;

//Start New Game
newGame();

//Dice Behavior on ROLL
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', () => {
    //Get random number
    const randomDice = Math.floor(Math.random() * 6) + 1;
    //Display result
    const diceDisplay = document.querySelector('.dice');
    diceDisplay.style.display = 'block';
    diceDisplay.src = 'dice-' + randomDice + '.png';

    if (randomDice === 6 && lastRolled === 6) {
        //Player forfeits points
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).innerHTML = 0;
        nextPlayer();
    }
    //Update round score if rolled # NOT 1
    else if (randomDice !== 1) {
        //Add score to roundTotal
        roundScore += randomDice;
        //Display roundTotal
        document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
        //Switch players if 1 is rolled    
    } else {
        nextPlayer();
    }
    lastRolled = randomDice;
});

//Dice Behavior on HOLD
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (playingGame) {
        //Add roundScore to globalScore id="score-0"
        score[activePlayer] += roundScore;
        //Update DOM
        document.querySelector('#score-' + activePlayer).innerHTML = score[activePlayer];
        
        //Tracking Winning score value
        let scoreInput = document.querySelector('.winning-score').value;

        if(scoreInput) {
            winningScore = scoreInput;
        } else {
            winningScore = 100;
        }
        //Did player win?
        if (score[activePlayer] >= winningScore) {
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















