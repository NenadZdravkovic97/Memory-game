let cardsArr = [
    {
        name: 'angular',
        image: 'img/angular.svg',
    },
    {
        name: 'angular',
        image: 'img/angular.svg',
    },
    {
        name: 'aurelia',
        image: 'img/aurelia.svg',
    },
    {
        name: 'aurelia',
        image: 'img/aurelia.svg',
    },
    {
        name: 'backbone',
        image: 'img/backbone.svg',
    },
    {
        name: 'backbone',
        image: 'img/backbone.svg',
    },
    {
        name: 'ember',
        image: 'img/ember.svg',
    },
    {
        name: 'ember',
        image: 'img/ember.svg',
    },
    {
        name: 'react',
        image: 'img/react.svg',
    },
    {
        name: 'react',
        image: 'img/react.svg',
    },
    {
        name: 'vue',
        image: 'img/vue.svg',
    },
    {
        name: 'vue',
        image: 'img/vue.svg',
    },
];

cardsArr.sort(() => 0.5 - Math.random());

let result = document.querySelector('#result-span');
let restart = document.querySelector('.restart');

let gameGrid = document.querySelector('.memory-game-grid');
let lockBoard = false;
let chosen = [];
let chosenId = [];
let matched = [];
let flipCard = function () {
    if (lockBoard === true) return;

    let cardId = this.getAttribute('data-id');
    chosen.push(cardsArr[cardId]);
    chosenId.push(cardId);
    this.classList.add('flip');
    if (chosen.length === 2) {
        lockBoard = true;
        // setTimeout(checkIfMatch, 500);
        setTimeout(() => {
            checkIfMatch();
            lockBoard = false;
        }, 500);
    }
};

let removeListener = function (card1, card2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
};
let unFlipCards = function (element1, element2) {
    element1.classList.remove('flip');
    element2.classList.remove('flip');
};

let checkIfMatch = function () {
    let first = chosen[0].name;
    let second = chosen[1].name;
    let firstId = chosenId[0];
    let secondId = chosenId[1];
    let card1 = document.querySelector(`[data-id="${firstId}"]`);
    let card2 = document.querySelector(`[data-id="${secondId}"]`);

    if (first === second) {
        matched.push(chosen);
        removeListener(card1, card2);
    } else {
        unFlipCards(card1, card2);
    }

    chosen = [];
    chosenId = [];

    result.textContent = matched.length;
    if (matched.length === cardsArr.length / 2) {
        setTimeout(() => {
            alert('You won the game');
        }, 600);
    }
};

let buildCards = () => {
    cardsArr.forEach((card, i) => {
        let cardWrapper = document.createElement('div');
        let imgFront = document.createElement('img');
        let imgBack = document.createElement('img');
        cardWrapper.classList.add('memory-card');
        cardWrapper.setAttribute('data-name', card.name);
        cardWrapper.setAttribute('data-id', i);
        imgFront.src = card.image;
        imgFront.classList.add('front-face');
        imgBack.src = 'img/js-badge.svg';
        imgBack.classList.add('back-face');
        cardWrapper.appendChild(imgFront);
        cardWrapper.appendChild(imgBack);
        gameGrid.appendChild(cardWrapper);

        cardWrapper.addEventListener('click', flipCard);
    });
};

buildCards();

restart.addEventListener('click', () => {
    cardsArr.sort(() => 0.5 - Math.random());
    while (gameGrid.firstChild) {
        gameGrid.removeChild(gameGrid.firstChild);
    }
    chosen = [];
    chosenId = [];
    matched = [];
    result.textContent = 0;
    buildCards();
});
