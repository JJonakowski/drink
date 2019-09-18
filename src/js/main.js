"use strict";

import {SSL_OP_SSLEAY_080_CLIENT_DH_BUG, WSASYSNOTREADY} from "constants";
// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

import datepicker from 'js-datepicker';

const picker = datepicker('#datepicker', {
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = date.toJSON().slice(0, 10)
    }
});

const drinks = new Map([
  ['water', {
    label: 'Woda',
    pos: 0,
    element: document.querySelector('.water__no--js')
  }],
  ['beer', {
    label: 'Piwo',
    pos: 1,
    element: document.querySelector('.beer__no--js')
  }],
  ['vodka', {
    label: 'Wódka',
    pos: 2,
    element: document.querySelector('.wodka__no--js')
  }]
]);

const addButtons = document.querySelectorAll('.drink__buttons--add');
const delButtons = document.querySelectorAll('.drink__buttons--del')

// Zmienne //

let remAll, date, tablicaDaty, tablicaDrink, calendar, calButton, naglowek;

// Tablice //
remAll = document.querySelector('.del__all--js');

date = new Date().toISOString().slice(0, 10);
tablicaDaty = [date];
tablicaDrink = [0, 0, 0];

// KALENDARZ //
calendar = document.querySelector('.datepicker--js');
calButton = document.querySelector('.calendar__button--js');
naglowek = document.querySelector('.inputText--js');

let calVal;

/*
calButton.addEventListener('click', (e) => {
    kalendarz();
})
*/

// FUNKCJE //

let sprawdzTablice = (nazwaPlynu) => {
    if (!localStorage.getItem("tablicaDaty", date)) {
        localStorage.setItem("tablicaDaty", JSON.stringify(tablicaDaty));
    } else {
        const x = JSON.parse(localStorage.getItem('tablicaDaty'));
        if (x[x.length - 1] != date) {
            x.push(date);
            localStorage.setItem("tablicaDaty", JSON.stringify(x));
        }
    }

    if (!localStorage.getItem(`day ${date}`)) {
        let tablicaDrink = [0, 0, 0];
        localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    }

    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
    ++tablicaDrink[drinks.get(nazwaPlynu).pos];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    ++drinks.get(nazwaPlynu).element.innerHTML;
}

let zmniejszLicznik = (nazwaPlynu) => {
    if (localStorage.getItem(`day ${date}`)) {
        tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));

        if (tablicaDrink[drinks.get(nazwaPlynu).pos] > 0) {
            --tablicaDrink[drinks.get(nazwaPlynu).pos];
            localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
            --drinks.get(nazwaPlynu).element.innerHTML;
        }
    }
}

function kalendarz() {
    let calVal = calendar.value;
    calVal = calVal.slice(-4) + "-" + calVal.slice(0, 2) + "-" + calVal.slice(3, 5);

    if (calVal) {
        if (localStorage.getItem(`day ${calVal}`)) {
            let wysw = JSON.parse(localStorage.getItem(`day ${calVal}`));
            naglowek.innerHTML = `Dnia ${calVal} wypiłeś ${wysw[0]} szklanek wody, ${wysw[1]} piwa i ${wysw[2]} wódki`;
            tablicaDrink = JSON.parse(localStorage.getItem(`day ${calVal}`, tablicaDrink));
            water.innerHTML = tablicaDrink[0];
            beer.innerHTML = tablicaDrink[1];
            wodka.innerHTML = tablicaDrink[2];
        }

    } else {
        tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
        water.innerHTML = tablicaDrink[0];
        beer.innerHTML = tablicaDrink[1];
        wodka.innerHTML = tablicaDrink[2];
        naglowek.innerHTML = null;
    }
}


// START //

drinks.forEach(obj => (obj) => {
  if (!localStorage.getItem(`day ${date}`)) {
    obj.element.innerHTML = 0;
  } else {
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
    obj.element.innerHTML = tablicaDrink[obj.pos];
  }
});

// events //
const handleClick = (e) => {
  let button = e.currentTarget;
  if( e.currentTarget.classList.contains('drink__buttons--add') ) {
    sprawdzTablice(button.getAttribute('data-key'));
  } else {
    zmniejszLicznik(button.getAttribute('data-key'));
  }
};
addButtons.forEach(button => button.addEventListener('click', handleClick));
delButtons.forEach(button => button.addEventListener('click', handleClick));

// USUN WSZYSTKO //

remAll.addEventListener('click', (e) => {
    if (localStorage.getItem(`day ${date}`)) {
        let tablicaDrink = [0, 0, 0];
        localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
        water.innerHTML = 0;
        beer.innerHTML = 0;
        wodka.innerHTML = 0;
    }
})
