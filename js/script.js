(() => {
  let cards = [];
  let cardPairs = [];
  let firstCard, secondCard;
  let hasFlippedCard = false;
  let boardLocked = false;
  let wrapper = document.querySelector('.wrapper');
  let cardInsideWrapper = '';
  let btn = document.querySelector('.btn');
  const wonElem = document.querySelector('.won');
  const FLIP_TIME = 300;
  const CARD_FLIP = 1000;

  // Function to shuffle the cards
  function shuffleCards(card) {
    for (let i = card.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [card[i], card[j]] = [card[j], card[i]];
    }

    return card;
  }

  // Generate random array of cards with pairs

  function generateRandomCards() {
    // Generate an array of numbers from 1 to 8

    let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8];

    // Create an array of objects with two properties: id and value

    for (let i = 0; i < numbersArray.length; i++) {
      let obj1 = { id: `card-${i + 1}`, value: numbersArray[i] };
      let obj2 = { id: `card-${i + 9}`, value: numbersArray[i] };

      cards.push(obj1);
      cards.push(obj2);

      cardPairs.push([obj1, obj2]); // Store the pairs in a separate array to check for matches later on
    }

    // Shuffle the array of numbers

    shuffleCards(cards);
  } // End of generateRandomCards() function

  let newGame = function () {
    cards = [];
    generateRandomCards(); // Call the function to generate random cards with pairs

    cardInsideWrapper = '';

    for (let item of cards) {
      cardInsideWrapper +=
        `<div id=${item.id} class="card">
          <div class="block hidden">` +
        item.value +
        '</div> </div>';
    }
    wrapper.innerHTML = cardInsideWrapper;
    cardsElements = document.querySelectorAll('.card');
    cardsElements.forEach((card) => {
      card.addEventListener('click', flipCard);
    });
  };
  newGame();

  function flipCard(e) {
    const target = e.target;
    if (boardLocked) {
      return;
    }

    if (!hasFlippedCard) {
      // FIrst click
      hasFlippedCard = true;
      firstCard = target;
    } else {
      // Second click
      hasFlippedCard = false;
      secondCard = target;

      checkforMatch();
    }

    target.classList.add('flipped');
    setTimeout(() => {
      target.querySelector('.block').classList.remove('hidden');
    }, FLIP_TIME);

    if (cards.length == document.querySelectorAll('.flipped').length) {
      wonElem.classList.add('active');
    }
  }

  const checkforMatch = () => {
    if (
      firstCard.id !== secondCard.id &&
      firstCard.querySelector('.block').textContent ==
        secondCard.querySelector('.block').textContent
    ) {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
    } else if (firstCard.id == secondCard.id) {
      hasFlippedCard = true;
      secondCard = null;
    } else {
      boardLocked = true;

      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('.block').classList.add('hidden');
        secondCard.querySelector('.block').classList.add('hidden');
        boardLocked = false;
      }, CARD_FLIP);
    }
  };

  btn.addEventListener('click', function () {
    wonElem.classList.remove('active');
    newGame();
  });
})();
