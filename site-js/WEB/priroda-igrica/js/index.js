var BRAINYMO = BRAINYMO || {};

BRAINYMO.Game = (function() {
  
    var activeCards = [];
    var numOfCards;
    var cardHitCounter = 0;
    var card;
    var timer;
    var storage;

    /**
     * Method that will be invoked on card click
     */
    function handleCardClick() {

        var connection = $(this).data('connection');
        var hit;

        // Set card in active state
        // 'this' needs to be attached to context of card which is clicked
        if ( !$(this).hasClass('active') ) {
            $(this).addClass('active');
            activeCards.push($(this));

            // If user click on two cards then check
            if (activeCards.length == 2) {
                hit = checkActiveCards(activeCards);
            }

            if (hit === true) {
                cardHitCounter++;
                activeCards[0].add(activeCards[1]).unbind().addClass('wobble cursor-default');
                activeCards = [];

                // Game End
                if(cardHitCounter === (numOfCards / 2)) {
                    // Reset active cards
                    activeCards = [];
                    // Reset counter
                    cardHitCounter = 0;
                    // End game
                    endGame();
                }
            }
            // In case when user open more then 2 cards then automatically close first two
            else if(activeCards.length === 3) {
                for(var i = 0; i < activeCards.length - 1; i++) {
                    activeCards[i].removeClass('active');
                }
                activeCards.splice(0, 2);
            }
        }
    }

    function endGame() {
        timer.stopTimer();

        // Retrieve current time
        var time = timer.retrieveTime();

        // Retrieve time from storage
        var timeFromStorage = storage.retrieveBestTime();

        // if there's already time saved in storage check if it's better than current one
        if (timeFromStorage != undefined && timeFromStorage != '') {
            // if current game time is better than one saved in store then save new one
            if (time.minutes < timeFromStorage.minutes || (time.minutes == timeFromStorage.minutes && time.seconds < timeFromStorage.seconds) ) {
                storage.setBestTime(time);
            }
        }
        // else if time is not saved in storage save it
        else {
            storage.setBestTime(time);
        }

        // Update best time
        timer.updateBestTime();
    }

    function checkActiveCards(connections) {
        return connections[0].data('connection') === connections[1].data('connection');
    }

    return function(config) {

        /**
         * Main method for game initialization
         */
        this.startGame = function() {
            card = new BRAINYMO.Card();
            timer = new BRAINYMO.Timer();
            storage = new BRAINYMO.Storage();
            numOfCards = config.cards.length;
            card.attachCardEvent(handleCardClick, config);
        };

        /**
         * After game initialization call this method in order to generate cards
         */
        this.generateCardSet = function() {
            // Generate new card set
            card.generateCards(config.cards);
            // Reset active cards array
            activeCards = [];

            // Reset timer
            timer.stopTimer();
            // Set timer
            timer.startTimer();
        };

        this.startGame();
    }

})();



BRAINYMO.Card = (function () {

    // Private variables
    var $cardsContainer = $('.cards-container');
    var $cardTemplate = $('#card-template');

    /**
     * Private method
     * Take card template from DOM and update it with card data
     * @param {Object} card - card object
     * @return {Object} template - jquery object
     */
    function prepareCardTemplate (card) {
        var template = $cardTemplate
                            .clone()
                            .removeAttr('id')
                            .removeClass('hide')
                            .attr('data-connection', card.connectionID);

        // If card has background image
        if (card.backImg != '' && card.backImg != undefined) {
            template.find('.back').css({
                'background': 'url(' + card.backImg + ') no-repeat center center',
                'background-size': 'cover'
            });
        }
        // Else if card has no background image but has text
        else if (card.backTxt != '' && card.backTxt != undefined) {
            template.find('.back > label').html(card.backTxt);
        }

        return template;
    }

    /**
     * Private method
     * Method for random shuffling array
     * @param {Object} cardsArray - array of card objects
     * @return {Object} returns random shuffled array
     */
    function shuffleCards(cardsArray) {
        var currentIndex = cardsArray.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = cardsArray[currentIndex];
            cardsArray[currentIndex] = cardsArray[randomIndex];
            cardsArray[randomIndex] = temporaryValue;
        }

        return cardsArray;
    }
    
    return function() {

        /**
         * Public method
         * Prepare all cards and insert them into DOM
         * Before inserting new set of cards method will erase all previous cards
         * @param {Object} cards - array of card objects
         */
        this.generateCards = function(cards) {
            var templates = [];
            var preparedTemplate;

            // Prepare every card and push it to array
            cards.forEach(function (card) {
                preparedTemplate = prepareCardTemplate(card);
                templates.push(preparedTemplate);
            });

            // Shuffle card array
            templates = shuffleCards(templates);

            // Hide and empty card container
            $cardsContainer.hide().empty();

            // Append all cards to cards container
            templates.forEach(function(card) {
                $cardsContainer.append(card);
            });

            // Show card container
            $cardsContainer.fadeIn('slow');
        };

        /**
         * Public method
         * Attach click event on every card
         * Before inserting new set of cards method will erase all previous cards
         * @param {Function} func - function that will be invoked on card click
         */
        this.attachCardEvent = function(func) {
            $cardsContainer.unbind().on('click', '.flip-container', function() {
                func.call(this);
            });
        }
    }
    
})();

BRAINYMO.Timer = (function() {

    var $timer = $('.timer');
    var $seconds = $timer.find('#seconds');
    var $minutes = $timer.find('#minutes');
    var $bestTimeContainer = $timer.find('.time');


    var minutes, seconds;
    
    function decorateNumber(value) {
        return value > 9 ? value : '0' + value;
    }

    return function() {
        var interval;
        var storage = new BRAINYMO.Storage();
        
        this.startTimer = function() {
            var sec = 0;
            var bestTime;

            // Set timer interval
            interval = setInterval( function() {
                seconds = ++sec % 60;
                minutes = parseInt(sec / 60, 10);
                $seconds.html(decorateNumber(seconds));
                $minutes.html(decorateNumber(minutes));
            }, 1000);

            // Show timer
            $timer.delay(1000).fadeIn();

            this.updateBestTime();
        };

        this.updateBestTime = function() {
            // Check if user have saved best game time
            bestTime = storage.retrieveBestTime();
            if(bestTime != undefined && bestTime != '') {
                $bestTimeContainer
                    .find('#bestTime')
                    .text(bestTime.minutes + ':' + bestTime.seconds)
                    .end()
                    .fadeIn();
            }
        };
        
        this.stopTimer = function() {
            clearInterval(interval);  
        };

        this.retrieveTime = function() {
            return {
                minutes: decorateNumber(minutes),
                seconds: decorateNumber(seconds)
            }
        };
    }
})();


BRAINYMO.Storage = (function() {

    return function() {

        /**
         * Save best time to localStorage
         * key = 'bestTime'
         * @param {Object} time - object with keys: 'minutes', 'seconds'
         */
        this.setBestTime = function(time) {
            localStorage.setItem('bestTime', JSON.stringify(time));
        };

        /**
         * Retrieve best time from localStorage
         */
        this.retrieveBestTime = function() {
            return JSON.parse(localStorage.getItem('bestTime'));
        };

    }
})();



// Game init
$(function() {
  
        var brainymo = new BRAINYMO.Game({
            cards: [
                {
                    backImg: 'https://ljekarne-homeosan.hr/wp-content/uploads/2013/05/sunce.png',
                    connectionID: 1
                },
                {
                    backTxt: 'SUNCE',
                    connectionID: 1
                },
                {
                    backImg: 'http://www.hdlu.hr/wp-content/uploads/2013/09/untitled.jpg',
                    connectionID: 2
                },
                {
                    backTxt: 'STABLO',
                    connectionID: 2
                },
                {
                    backImg: 'https://images.homedepot-static.com/productImages/612ae505-9daf-45c3-ac16-67f97dcb251d/svn/globalrose-flower-bouquets-prime-100-red-roses-64_1000.jpg',
                    connectionID: 3
                },
                {
                    backTxt: 'CVIJET',
                    connectionID: 3
                },
                {
                    backImg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFRUWFxoYFxgXGBYXGhUXGhUWGBgbFxgaHSggGBolGxgVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0mHyUtKy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABAECAwUGB//EADoQAAEDAgMFBwMDAgYDAQAAAAEAAhEDIQQxQQUSUWFxBiKBkaGx8BMywdHh8UJSBxQjYnKCJEPCFf/EABoBAQADAQEBAAAAAAAAAAAAAAABAgQDBQb/xAArEQACAgEEAQMDAwUAAAAAAAAAAQIRAwQSITEFE0FhIjJRFMHwFUJxgaH/2gAMAwEAAhEDEQA/APcUREAREQBERAEREAREQBFQlVQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAFRxgSqoUB4n/iD2zdiq7aGGkU6TvvBMufOYjKNDnc5L0LsF2l/wA3S3KhH16QAeP7xo8dcjzHMKRtzshh68vaxtOro9oAn/kBn7rzjEYSvgMSHt7tRjj/AMXtOYOUsP6ai2DJlngnunzF+5sShkhtjxR7Si12wdrMxVFtVlps5pzY4ZtPT1stityaatGRpp0wiIpICIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAijVsbTbm4e619XtHRFhvE9LKjnFds6ww5J/bFm5Wn7S7CZi6Ra6A8XY7geHQqBie1H9oHqVra236xP3EchAWfLqMNOMjVj8fnbvo0vY7HnB4o0XyGvO4+YEPBhp87ePJeol4GZC8i23QcXfVNy43PNSqLX1Qw75tmOJ+QsGj1exvF3XX+DQ9D6mRpyo9UDhxVZXGYDAPAknpcrDjcNUJJLiAOZWz9bzW04foYuVb/8Ah3KLgRTqxd7ugcR7KRTfVZ/7XDlLj6LstQn7Evx9dTR2yLlaG3Xs+8l3/X8yFssJ2iovsXbp5gj1XRZYv3OE9HljzVr4NwitY4ESCCOSuXQyhERAEREAREQBERAEREAREQBEUHaGPFMGM/ZQ2krZaMXJ0jLjMY2mLm/BaDH7X3pl26OsKFiKzqhmSJ11P6KDVwQ0AnUmffMlZp5G+j19PpIR+/sVdognugny/KwPJdob9FmbgYHdz4xPuoVZ72zOmZmAViyymvY9OCj/AGFlfCugxIWuZtQscGPsugobRbYPIv8ALLWbZ2dSryabwCOJiPGIWPNurlcHaE+duRf7JlYh9MgXtIWDsvUH1C0mbSPC35HktfsyhiKY3XUy7gWkOB8j7rZbL2VUp1mvdDIzBN92CLxlosGOGWGToxailL6X+TsqNQEQr6tNoEnNaN212tMAEn8qDica529vPAPDkvXwwn3MzR0k5P8ABs6+LY25M9LwtbidvASGwOog+ErQ7UqPGst+ZKE2iKusxrqArzz7eD1sOgx0pTZvnbXc65fHv5KyvingE2ePIjotbVBY0Nd3wf6rAt5Hks4aGXMgWLTOpytwyCzvUuzr6MF1/P3JWzu0b6Zmm4jiwmQu52H2jZXhru4/gcj0/ReZYvAtqt3mEB4zPE6W1HqFBw+LNIgOJDhmJtPFq1YNVRk1Xj8edWlUj3hFyXZHtOK3+lUcN8Duu/uGnXqusC9SMlJWj5fLililtkVREVjmEREAREQBERAERWvcACTogIe1McKbcxMeQ4rnA8mXO/6g+7v0ULaO1xWruZ/S2J4E6Dmsz35GeiySnvfwe3h0rxRV9vkvdWtExxWIyROQWN7wVbvZKDSoUZRwWtxlBsmZN+NvIKTVfFlEfdVZ3xRadkKnsoOP3Wi5vKqcC4CGgGJjSf2UxtiR+Ve6pbqqemjQ8s2+yBhqdQOLnE5DI2GU2XQikyJAniZN+vJah9bSFMoVhukTdEkjhnUpUyNWduOdugCfcc1HdU3rDVWY14la6u/cEgzrnkhphDhfkw7YxBpghQdi7TNJ8PAgm4OrdITF4kVW3IJmDnYcT0Wl+sC0Ek7wyvbSyzZoWevp8cZ43CSPQMRgPq2EXvcafj9lEpYR0lpJIm5GZi2Sw9ndpfUADiZFs5014roGULGDp5+K86KcZbTyskp4W4SNHTwjmwJuHa+k6aKPtfBOe6HANcLtNstTPDkVuX0yWnWLiFHLi6MoblOcQtajzZKyO7OVoV6lF4OTm3EHmbcCDf5l7J2Q7QNxNMAnvgeY/VeXbS2aA01Gydz7hrHLp+OSs7ObZOGrti2Xj16hbsGXazJr9LHUY7XaPdkWDBYltRjXtycJWdekfJtU6YREQgIiIAiIgC0/afF/ToO4my3C4vt5jgxsHkI6mP1VMjqLNehxepnjGvc5bYocS57vBbwGdclpsDWvujIAfspzn88lijwj6fOnKZID4d0WVvGxUJmh5qtWpNslazg4WYq1SSsZKsqVRvEeErHUfnwUHdKkZGumwGt1c9xcI4KIK1raoahPknsKtl+JcQB8ulLFEx6+y09TFEu3eEny1Kq3GBomRmqo7OJs8fV3RbhquXx+0wZi9ohX7c2kXMAEg639FzJeZUpGjHiSqUiUzEunxlXYSpDgNCemfwKNQr7s2BkRebc+qqx9wVSSs3QkkuDqthANcWkxwvb5muvLjujouKwDh3XAARnlqugo44kROWWWvArLPFzZ52pTnKyW+ruWznRYHOG9nI15TnbxVX8earhgQ7gD4ifhVoxONJKy+myTE903g5jL91zu3MBD3PHW0XHIjpZdFTeA8i1p/hNpUw5pcBcCJ5dFNuMiqdM6P/Dbau/T+kTNpb/9LtwvIOxVb6WIAnJ3pqvXwvTwSuJ835PD6ea10yqIi7nnBERAEREAK8o/xCxElp4vPl8C9RxToY48Gn2XkXbWDHj8hcM74o9zwUV6+5luBOovOR4gCLeqnm1tVy2BxpaRJEREcMvJb2jiR92YWZHvZsbs2LHWJ4WhRq1aViZUSpUayJ4KGznGFGOYzWPE4nugaBa7EbRbxz5rX4zaADbd6+YUov6Tvo3jaoDRJz/ZYa2NbumDEZmVz2PxznBrctfhUKvXIMRYQYzH7ozvi0/TZLrY37nAixgDiNTKiVca4xw+SoxJJVXCBBzChM1PEjLWrFwMnL8lRW0yZI0EnLKQNeoVpN1lgROuiWUatUW02T4ST+qvpZqzDvIJvE2MHMcOiz4SpDwSJVb5Oi+2zdbPd7rdMe3TLLyzPnK1GFbAJNuvRSKDjIjLPNVasxy7OlosDmGb5XV+GLQx17g68IUSg0lvdvcrAyqZvFs+iokZnG7Vl4B+oRpz6afNVtKFWbRaI6WnJaWs4Sbzz/I8lU9x7QHSDHgTZJR3ESVkul/pvbb+r3XreDfLGni0ey8tFPKczu8+K9J2E/ew9M/7Vr0j7PH8urUWT0RFtPCCIiAIiIDBjRLHD/afZeW9pqAcCCL/AKm/ovVqgsei8y7SMh5+arhnXB7Ph57Zs86xjnB0u4m95JtE/qszdo1DBB729vExfWPCVs9pYIPIgXn1Wu//ADjOcET6Z6rOfXQyQn2SKG0i0C/eIt14HwUTae0KhIvZwkcRxv8AMlhxNN8S5kaa6LXPK5s7xxxXNF1RxNyZvGd7R5C/urjXBaBBkHjp0jqoxOayMEKUyO2SaLg543shnyAysTfMKPUdJsPWVdWdMWAtp5SeajNq7rgYB669VVW2TOSiqMptdKrybm/XPzVHusFQ5KpZtclr5A3bRIdpqLXzyiyoD7KlIFzoAkmwHEo4KWZ4/ApOANxOftY+BupmDxDQSC2QfMdFrw0zA6LOKJDoNjcZzcdFZIpufRu2PkRvQJv8Oi2FGBE8PnRaUGNYErYUnugCYnKY1I8YzSRyUTqcNX3WWgcekQoEDecImDbxWOm17QGagaZHh7q6pht2HHJ3HQ2OS5dFFFJmWnQibwDBtaLkfOqriKG6/wAc1irYdwOUWsJzv63lScNSc57Z43nQiQVKboq1XNmzpUoLDxIPr/C9E7Oj/wAen0PuVwdGjl/y9fgXoeyae7RYP9o9brVpDwPLSuEV8ktERbTwwiIgCIiAoV572opRULonRehrj+1uGuSNVzyrg3+OntynA4hpseseBUfdke6l4xtzylR6QvBKxvo+rxsi1bg71+q0bm7hB1B4Wz5hdRufe2bjLn4rUY6i0nK8qifJtxTVUaHEUxI3eBnrJy8IWZjAWxkQCSb3uIGUTqs3+XBcJMCQCeSi1G96OvirUXUkVInLkOCsqUmgZyZNoyIMdLi6u+m4Deg8rIaBIPsq0XlJGFsHMwCc4mPBYwOlr6fCpJo7ubZ9NP4VcNhN5pJdHAXknhAFreynac5MguzsryFc2jxV7aciFbYck6swRClboLRq6TOUaRfjmr20AGkFsk63tqYVxpd2AMpE8bzf5opqjnuTZRwyOa2lWvLAC0TNjxF/28lFEimGEazkJ884zWamwxByMH1VXyE2bbZuJsLSYzmDAyz8VOxVcvALjl0yOXpK1ODpndi9vn5WwpUppzqD/C4tKw0uzPRoFwmSQOnhfzWbAPsTlprx/lUwdTuOaOI9vRSMMAwgCTrfjcwo+DlJ9m52aO8B4r0TDshoHAAei4XYFPfe1pH9QJ9yu9C3aVcNnzPlZXNIqiItR5QREQBERAFqO0OG3mg8LeBW3WLEUt5pHFQ1aL4p7Jpnku2KBDiOfutOJnhC7Tb+DMutcBcn9rt74VjmqPrNLl3RTMDmEQZzn0WDFVA6LRAg+CkimHGCTfLkchKhVWxI8Fxo9FNMi1KcmT8GiwYihBvHGbGymUnEW42uAbcuCx1mC0TcXB48lYOVGJjWlveJsdPFYqMd4AXOXrb28la6Acp/hVpkyCpobjMYDTpPC1wsFSjuwZ3pu7iDOvus0ydBfPOVWpBE/wAemSrVE7jXMp+/vCubSPL+FJeYmytDBuk33p4WiOKtZVyMTaZiflws1GhH3GDYhVdTcLGRkYPRVoFpBLrnh+vBSyhnwjm78m4GhUioQ4uNo0zsMgFEpNN4GSvp1Br7niqtFkbilWBptG7lnxOf4VtJ0MzEk5XmLLFhHb1tPL5qs9HDHeOkN1/K5dE0T8PhgwCTciRzF1KwsuIMcfGT/PkotV4gNg7wF+Xyy2eCH23knTgLAD3UKzPkbUbOr7JYbN8ZD1P7LqFC2Thvp0mjU3PUqavTxR2xSPkNTk9TK5BERdDOEREAREQBERAaPb+DkbwGa842hQh27GXz9F7BWpBwIORXDdodmbpNvHiuOWPuev47UV9DOL+iARJz14GfZR6lMgk/JHBbevTEG08D1ULEUSBMWN7aLI0fQ48hqKkEkmd7TkZ1Vu4Q7vDKAZ0UyuG7tm3Jznoo76bom8GxnKUR1bImIaCSRYT5KlepYWFsipFejfSIm3zNY6BcWub3MjnE+EqQ3wRsTEgiRYefFZaLC60gWOoHurazGn7AY58eqkCmSA23Uj8oyERGOE3AMacY0KuxFG5HIER5/OitNIkkcPlllptzRk0G3iSd79wlRg3u6CBz1Wakw3dchsX+WHVULCTO7YXte2nRUsskX4SqGyYsRHDxVKe7ukEd6bRlF/XJVovnda4kMB0F78FlFIRJ4QJsY4n1UN0TFckzAtAaCDJIM2t09/JSMOHODpiAY8cz1yHksRf9rGAOi1rdeqk0wd0kQC0k2tJPPyXJsPovwjJMO1+fhdT2V2eKlWY7jYN9YndHjmuewdMuIDZL3EBen7F2eKFIN/qzcef6DJaNPDc7Z4/lNT6cNq7ZPCqiL0T5cIiIAiIgCIiAIiIAom0MGKjY10UtEJjJxdo8z2vgNxxBH7FajEUpsQYETGh/C9P21swVWmB3vf8AdcFj8KQS12YmJtPIrJkhTPotFqlkXyc3Vp/2TPvrIUYgxEm+kWtz8wtriaY0B9ioLqRi1i3W9pOq4s9eMk0RgQWhsRxPG6w4VveJ3Q6ct7IHK+ik1JaRcHdyOYPnoqV8R3d0AXM90QDbUKtlvgjOobsk58hI8YNtFkY6WFvdIGuUTfOEdUMRMCVfSLXsLQJcM7xI5zzjyRvgkifRI728CSbATIve+XBULC10O49QfHVXinaZmMgM8uGoVocQ6N2TlebGbkJZaitFu9aQ0TqTGWoWV1VxM7ze8LxblB4KylRMfaDbW26bXJ/XisVUBoMzEWiLnSeSrZdIlU2tBcDuuOhabA/lXndLW3703zuB1sP3UWhUdIltyIBiLR8upsQ7d3bj7jM+v6KsuCUSgWtu0OE2Jznis1MEwBnEmxvJm5UbD08u6c7GSu27ObEkipUFsw3jz6JjxubpGPVamGCNs2HZDY30wKtQd8/aOAOp5ldY1yiU1naV60IKKpHx+fLLNNzkZpVZWMFXAqxxovRUCqoICIiAIiIAiIgCIiALU7b2S2sJsHjI8eq2yxVQoaT4ZfHNwknE8t2ngn0iQ5vhmDzBWmr055cei9Q2pgQ8QRK4vaex3NMtlZJ4muj6LTa6LX1cM5+uRcGDoDEevFQ3XAbvNGuXpMSVIrjdfJt1tl4KPVqgmbXM8pWdqj04ZYy6ZhrVjEkA6XHkQrG15kmN6eYPUQIhX1nT3cm6wbTxuY9Vhpv3TcWJgyNE9jsmjLiaoEiToRleOGsZ5FYnuzIIvBG7kDORlWPrZ2H9uZO6DoL/ALK0ERugyDfKL/nkoLJok4fEwDuyXHWSIzWBm8ZDZ3xmZAtrAzVlFu60SBJM5TH6rNTpgnIHhp5gWUpCWSMTKO8YOQMTmRMT+VOo0jMAa2JucrLJgNkPdmIHIAey6rZWygyDF+KtHC5GDP5CEFUeSR2d2HEPq3OjeHXmuvpNWuwghbKk6VvxxUVSPm9RlnllukZ2rIArGrIFcysK4KkK4BSVKhXBUCqFBBVERAEREAREQBERAEKIgMT6QKhYnZ4dotkiFozaOSx3Ztr/AOlc/jOxTTkI6L0wtVhpBVcUzvHUSR49iOw7tCVAf2JrA2c5e2nDN4Kw4NvBV9KJ2WuyL3PEh2Lr/wBx8lIp9i6urivZP8k3gn+SHBR6MS39Qy/k8qwvYj+6T1W9wPZhrP6V3Iwg4K4YcKyxpHKWqlLtnN0NlgaKWzBQt39AJ9FWo5eqaxmHUinShTBSVdxKKuZjY1ZA1XBquVjm2WQqq5FBBRVREAREQBERAEREAREQBERAEREAREQBERQCiBEQFURFICFEUAIiKQEREAREQBERAEREB//Z',
                    connectionID: 4
                },
                {
                    backTxt: 'JABUKA',
                    connectionID: 4
                },
                {
                    backImg: 'https://happyreign.files.wordpress.com/2017/01/bigstock-happy-family-standing-on-the-b-98845208.jpeg?w=900&h=600',
                    connectionID: 5
                },
                {
                    backTxt: 'OBITELJ', 
                    connectionID: 5
                },
                {
                    backImg: 'https://settlersindia.com/sites/default/files/building-1400x1051.jpg',
                    connectionID: 6
                },
                {
                    backTxt: 'ŠKOLA',
                    connectionID: 6
                },
                {
                    backImg: 'https://res.cloudinary.com/teepublic/image/private/s--JnfxjOP1--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1509564403/production/designs/2016815_1.jpg',
                    connectionID: 7
                },
                {
                    backTxt: 'ČOVIJEK',
                    connectionID: 7
                },
                {
                    backImg: 'https://i.ytimg.com/vi/GHNM9X96dlk/maxresdefault.jpg',
                    connectionID: 8
                },
                {
                    backTxt: 'RIJEKA',
                    connectionID: 8
                },
            ]
        });

        $('#btn-start').click(function() {
            brainymo.generateCardSet();
            $(this).text('Restart');
        });

    });