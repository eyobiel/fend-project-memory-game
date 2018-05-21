(function() {
    /*
     * List of variables
     */
    const move = $('.moves');
    const deck = $('.deck');
    let card = $('.card'),
        openCards = [],
        restart = $('.restart'),
        deckCards =   ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
        numberOfMatch = 0,
        numberOfPairCards = deckCards.length / 2,
        moveNumber = 0;

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

    function intial(array) {
        let html = "";
        array.forEach(element => {
            html += `<li class="card">
                        <i class="${element}"></i>
                    </li>`;
        });
        deck.html(html);
    }

    function openAndMatchCard(e) {
        let el = $(this);
        let card = $('.card');
        let cardName = el.find('i').attr('class');

        if (el.hasClass('show') || el.hasClass('match')) { return true; }
        el.addClass('open show');
        openCards.push(cardName);

        if (openCards.length > 1) {
            if (openCards[0] == cardName) {
                numberOfMatch++;
                moveNumber++;
                console.log('match');
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

        move.text(moveNumber);
        if (numberOfMatch == numberOfPairCards) {
            let modal = ` <div class="modal">
                            <div class="modal-body">
                                <h2>Congratulations! You have Won the Game</h2>
                                <p>You completed the game in <span class="number-moves">${moveNumber}</span> moves</p>
                                <p><button class="modal-btn"> <i class="fa fa-repeat"></i></button> Restart Game</p>
    
                            </div>
                        </div>`;

            $('body').append(modal);
        }
    }


    function restartGame(e) {
        intial(shuffle(deckCards));
        move.text(0);
        numberOfMatch = 0;
        moveNumber = 0;
        $('.modal').remove();
    }





























}());