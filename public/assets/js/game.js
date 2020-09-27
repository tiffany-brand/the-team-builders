$(function () {

  // JQUERY SELECTORS //
  // Form
  const $gameTeamSelection = $("#gameTeamSelection");
  const $gameQuestionSelection = $("#gameQuestionSelection");
  const $gameForm = $(".game-form");
  // Game instructions row
  const $gameInstruct = $(".game-instruct");
  // Start game button
  const $startGame = $("#start-game");
  // Area to attach cards
  const $deck = $(".deck");
  
  // Score & Modal
  // Timer
  let $timer = $(".timer");
  let nowTime;
  // Class for star
  const $rating = $(".fa-star");
  // Moves text
  let $moves = $(".moves");
  // Winner text 
  let $winnerText = $("#winnerText");
  let $winnerModal = $("#winnerModal");

  // VARIABLES FOR GAME //
  // Axios getCards() variables
  // Array to push axios results upon form submit
  let users = [];
  // Create two different arrays and then combine so they can all be shuffled
  // Names
  let namesArray = [];
  // Answers
  let answersArray = [];
  // Combined Game Array
  let allArray = [];

  // The allOpen array specifies all added cards facing up
  let allOpen = [];
  // Keep track of matches
  let match = 0;
  // Time to wait between flipping cards back
  let wait = 420;
  // Compare matched cards to total card count
  let totalCard;
  // Keep track of moves
  let moves = 0;
  // Start game seconds
  let second = 0;

  // Scoring system from 1 to 3 stars to shorten code
  // Should be based on how many pairings there are, hence namesArray.length
  let stars3 = namesArray.length - 2;
  let stars2 = namesArray.length;
  let star1 = namesArray.length + 6;

  // AXIOS CALLS // 
  // Get Team Names for the drop-down
  const getTeams = () => {
    axios.get("/api/team")
      .then((response) => {

        let s = "<option value=\"-1\">Team Selections</option>";
        for (let i = 0; i < response.data.length; i++) {
          s += `<option value=${response.data[i].id}>${response.data[i].name}</option>`;
        }

        $gameTeamSelection.html(s);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Get Questions for the drop-down
  const getQuestions = () => {
    axios.get("/api/question")
      .then((response) => {

        let s = "<option value=\"-1\">Question Selections</option>";
        for (let i = 0; i < response.data.length; i++) {
          s += `<option value=${response.data[i].id}>${response.data[i].question}</option>`;
        }

        $gameQuestionSelection.html(s);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Get answers for the team and question selections
  const getCards = (teamid, questionid) => {
    axios.get(`/api/singleQuestion/${questionid}/${teamid}`)
      .then((response) => {
        // Since pushing response.data would push everything into an array with length 1
        // setting the array and then pushing each returned object into the users array
        // maps the map functions work later on in the function
        let array = response.data;
        array.forEach((element) => users.push(element));
        
        // Set the name and answer arrays that we will need for creating the cards later
        namesArray = users.map((user) => {
          return { cardvalue: user.TeamMember.nick_name, id: user.TeamMember.auth0_id };
        });

        answersArray = users.map((user) => {
          return { cardvalue: user.answer, id: user.TeamMember.auth0_id };
        });

        // Combine the arrays together and get the totalCard to use in matching logic
        allArray = namesArray.concat(answersArray);
        totalCard = allArray.length / 2;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // GAME FUNCTIONS //
  // Shuffling function: enables that no two games have the same card arrangement 
  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // Function to start game, show cards
  const init = () => {
    // Show card board
    $(".show-cards").css("display", "block");

    // Shuffle array
    let allCards = shuffle(allArray);
    // Empty div
    $deck.empty();

    // Append cards to deck
    for (let i = 0; i < allCards.length; i++) {
      $deck.append($(`<li class="card gamecard text-wrap" data-id=${allCards[i].id}">${allCards[i].cardvalue}</li>`));
    }

    // Function to match cards
    addCardListener();

    // Enables the timer to reset to 0 when the game is restarted
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`);
    initTime();
  };

  // Adds a score from 1 to 3 stars depending on the amount of moves done
  const rating = (moves) => {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
      $rating.eq(3).removeClass("fa-star").addClass("fa-star-o");
    } else if (moves > stars2 && moves < star1) {
      $rating.eq(2).removeClass("fa-star").addClass("fa-star-o");
    } else if (moves > star1) {
      $rating.eq(1).removeClass("fa-star").addClass("fa-star-o");
      rating = 1;
    }
    return { score: rating };
  };

  // Add boostrap modal alert window showing time, moves, score it took to finish the game, toggles when all pairs are matched.
  const gameOver = (moves, score) => {
    $winnerText.text(`In ${second} seconds, you did a total of ${moves} moves with a score of ${score}. Well done team!`);
    $winnerModal.modal("toggle");
  };

  // Initiates the timer as soon as the game is loaded
  const initTime = () => {
    nowTime = setInterval(function () {
      $timer.text(`${second}`);
      second = second + 1;
    }, 1000);
  };

  // Resets the timer when the game ends or is restarted
  const resetTimer = (timer) => {
    if (timer) {
      clearInterval(timer);
    }
  };

  // This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
  // If cards do not match, both cards are flipped back over.
  let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find(".card").bind("click", function () {
      let $this = $(this);

      if ($this.hasClass("show") || $this.hasClass("match")) { return true; }

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
        moves++;

        // The number of moves is added to the rating() function that will determine the star score
        rating(moves);

        // The number of moves are added to the modal HTML alert
        $moves.html(moves);
      }

      // The game is finished once all cards have been matched, with a short delay
      if (totalCard == match) {
        rating(moves);
        let score = rating(moves).score;
        setTimeout(function () {
          gameOver(moves, score);
        }, 500);
      }
    });
  };

  // FUNCTION CALLS //
  // Populate drop-downs
  getTeams();
  getQuestions();

  // LISTEN EVENTS //
  // On form submission, show game instructions
  $gameForm.on("submit", function (event) {
    event.preventDefault();
    // Axios to get the game data
    getCards($gameTeamSelection.val(), $gameQuestionSelection.val());
    // Show game instructions
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

/*
Credits
Memory Game Starter Code
https://github.com/Ul1ra/MemGame/blob/master/js/app.js

Populate Drop-Downs
//https://www.c-sharpcorner.com/article/populating-dropown-with-ajax-call/
*/