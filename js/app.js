(function() {
    /*
     * List of variables
     */
    const move = $('.moves'),
        deck = $('.deck'),
        rate = $('.stars'),
        timer = $('.timer');

    let card = $('.card'),
        openCards = [],
        restart = $('.restart'),
        deckCards =   ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
        numberOfMatch = 0,
        numberOfPairCards = deckCards.length / 2,
        second = 0,
        moveNumber = 0,
        timeCount,
        timeElapsed;


    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */
    // start Game
    intial(shuffle(deckCards));

    // Event listner for cards on click
    deck.on('click', '.card', openAndMatchCard);
    // Restart Game
    restart.on('click', restartGame);
    // Restart Game and remove modal box
    $(document).on('click', '.modal-btn', restartGame);

    // functions 

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    // Start the game and create cards
    function intial(array) {
        let html = "";
        array.forEach(element => {
            html += `<li class="card">
                        <i class="${element}"></i>
                    </li>`;
        });
        deck.html(html);
        rate.html(scoreStars(moveNumber));
        initiateTimer();
    }
    // It opens and matches cards
    function openAndMatchCard(e) {
        let el = $(this);
        let card = $('.card');
        let cardName = el.find('i').attr('class');

        //prevent clicking on opened and matched cards
        if (el.hasClass('show') || el.hasClass('match')) { return true; }
        el.addClass('open show');
        openCards.push(cardName);


        if (openCards.length > 1) { //Tries to match card if there is an already open card
            if (openCards[0] == cardName) {
                numberOfMatch++;
                moveNumber++;
                $(deck).find('.open').addClass('match').removeClass('open show');

            } else {
                moveNumber++
                $(deck).find('.open').addClass('unmatch');

                setTimeout(function() {
                    $(deck).find('.open').removeClass('open show unmatch');
                }, 700);
            }
            openCards = [];
        }

        move.text(moveNumber); //print number of moves taken
        rate.html(scoreStars(moveNumber)); // print score stars

        //when all cards are matched create modal pop up and inform player
        if (numberOfMatch == numberOfPairCards) {
            let rate = "";
            let elapsedTime = timeCount;
            rate = scoreStars(moveNumber);
            //modal pop up when game is finished
            let modal = ` <div class="modal">
                            <div class="modal-body">
                                <h2>Congratulations! You have Won the Game</h2>
                                <ul class="rate-score"><li>Your Score is </li>${rate}</ul>
                                <p>You completed the game in ${elapsedTime} time and ${moveNumber} moves</p>
                                <p><button class="modal-btn"> <i class="fa fa-repeat"></i></button> Restart Game</p>
    
                            </div>
                        </div>`;

            $('body').append(modal);
            $('.timer').html(elapsedTime);


        }
    }

    //Restart the game 
    function restartGame() {
        intial(shuffle(deckCards));
        move.text(0);
        numberOfMatch = 0;
        moveNumber = 0;
        second = 0;
        openCards = [];
        $('.modal').remove();
        rate.html(scoreStars(moveNumber));
        resetTimer(timeElapsed);

    }
    //Score stars by the number of move a player took to finish the game
    function scoreStars(moveNumber) {
        let html = '<li><i class="fa fa-star"></i></li>';
        let rateStars = html.repeat(3);
        if (moveNumber > 16 && moveNumber <= 22) {
            rateStars = html.repeat(2);
        } else if (moveNumber > 22) {
            rateStars = html;
        }
        return rateStars;

    }
    //Start the Game timer
    function initiateTimer() {
        timeElapsed = setInterval(function() {
            let date = new Date(null);
            second = second + 1;
            date.setSeconds(second); // specify value for second
            timeCount = date.toISOString().substr(11, 8);
            timer.html(timeCount); //print timer

        }, 1000);
    }
    // Resets the Game timer
    function resetTimer(timer) {
        clearInterval(timer);
    }








}());