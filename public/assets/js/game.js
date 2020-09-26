$(function () {

  // Need axios call to DB data
  let users = [
    {
      name: "Hilary",
      answer: "blue",
      auth0: "1a"
    },
    {
      name: "Mary",
      answer: "pink",
      auth0: "2a"
    },
    {
      name: "Macks",
      answer: "orange",
      auth0: "3a"
    },
    {
      name: "Tiffany",
      answer: "magenta",
      auth0: "4a"
    },
    {
      name: "Chase",
      answer: "red",
      auth0: "5a"
    },
    {
      name: "Nicole",
      answer: "navy",
      auth0: "6a"
    }
  ];

  // create two different arrays and then combine so they can all be shuffled
  let namesArray = users.map((user) => {
    return { cardvalue: user.name, id: user.auth0 };
  });

  let answersArray = users.map((user) => {
    return { cardvalue: user.answer, id: user.auth0 };
  });

  let allArray = namesArray.concat(answersArray);

  // other useful variables
  // The allOpen array specifies all added cards facing up
  let allOpen = [];
  // keep track of matches
  let match = 0;
  // time to wait between flipping cards back
  let wait = 420;
  // to compare matched cards to total card count
  let totalCard = allArray.length;

  // selectors
  //form
  const $gameForm = $(".game-form");
  // game instructions row
  const $gameInstruct = $(".game-instruct");
  // start game button
  const $startGame = $("#start-game");
  // area to attach cards
  const $cardBoard = $(".card-board");
  const $deck = $(".deck");

  // Shuffling function: enables that no two games have the same card arrangement 
  // https://github.com/Ul1ra/MemGame/blob/master/js/app.js
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // function to start game, show cards
  function init() {
    // show card board
    $(".show-cards").css("display", "block");

    // shuffle array
    let allCards = shuffle(allArray);
    // empty div
    $deck.empty();

    console.log(allCards);

    // append cards to deck
    for (let i = 0; i < allCards.length; i++) {
      $deck.append($(`<li class="card" data-id=${allCards[i].id}">${allCards[i].cardvalue}</li>`));
    }

    // function to match cards
    addCardListener();
  }

  // This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
  // If cards do not match, both cards are flipped back over.
  let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find(".card").bind("click", function () {
      let $this = $(this);

      if ($this.hasClass("show") || $this.hasClass("match")) { return true; }

      //let card = $this.context.innerHTML;
      let cardId = $this.data("id");
      $this.addClass("open show");
      allOpen.push(cardId);

      // Compares cards if they matched
      if (allOpen.length > 1) {
        if (cardId === allOpen[0]) {
          $deck.find(".open").addClass("match");
          setTimeout(function () {
            $deck.find("open").removeClass("open show");
          }, wait);
          match++;

          // If cards are not matched, there is a delay of 630ms, and the cards will turn back cover up.
        } else {
          $deck.find(".open").addClass("notmatch");
          setTimeout(function () {
            $deck.find(".open").removeClass("open show");
          }, wait / 1.5);
        }

        // The allOpen array specifies all added cards facing up
        allOpen = [];

        // Increments the number of moves by one only when two cards are matched or not matched
        //moves++;

        // The number of moves is added to the rating() function that will determine the star score
        //rating(moves);

        // The number of moves are added to the modal HTML alert
        //$moves.html(moves);
      }

      // The game is finished once all cards have been matched, with a short delay
      if (totalCard === match) {
        // append not working - do modal instead??
        const yayFinalDiv = $("<p>").addClass("font-weight-bolder yay-final").css("display", "block").text("Congrats! You successfully matched all the cards!");
        $cardBoard.append(yayFinalDiv);

        //rating(moves);
        //let score = rating(moves).score;
        setTimeout(function () {
          //gameOver(moves, score);
          $cardBoard.append(yayFinalDiv);
        }, 500);
      }
    });
  };

  // LISTEN events
  // On form submission, show game instructions
  $gameForm.on("submit", function (event) {
    event.preventDefault();
    $gameInstruct.css("display", "block");
  });

  // On start game click, show memory board
  $startGame.on("click", function (event) {
    event.preventDefault();
    // hide instructions
    $gameInstruct.css("display", "none");

    // start game - create cards
    init();
  });

});