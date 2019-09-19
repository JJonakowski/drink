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

const picker = datepicker('#datepicker', { //datepicker instance
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = date.toJSON().slice(0, 10)
    }
});
const drinks = new Map([ //drinks config
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
const addButtons = document.querySelectorAll('.drink__buttons--add'); //add buttons
const delButtons = document.querySelectorAll('.drink__buttons--del'); //remove buttons
const delAllButton = document.querySelector('.del__all--js');
let currentDate = new Date().toISOString().slice(0, 10); //init selected date


// Zmienne //
let calendar, calButton, naglowek;


// KALENDARZ //
calendar = document.querySelector('.datepicker--js');
calButton = document.querySelector('.calendar__button--js');
naglowek = document.querySelector('.inputText--js');

let calVal;

// FUNKCJE //

let storageIndexInit = (date) => {
    if (!localStorage.getItem("daysIndex")) {
        localStorage.setItem("daysIndex", JSON.stringify([]));
    }
};

let storageIndexAdd = (date) => {
    let dates = JSON.parse(localStorage.getItem('daysIndex'));
    if (!dates.includes(date)) {
        dates.push(date);
        localStorage.setItem("daysIndex", JSON.stringify(dates));
    }
};

let storageIndexRemove = (date) => {
    let dates = JSON.parse(localStorage.getItem('daysIndex'));
    if (dates.includes(date)) {
        dates.splice(dates.indexOf(date), 1);
        localStorage.setItem("daysIndex", JSON.stringify(dates));
    }
};

let storageDayInit = (date) => {
    let value = [0, 0, 0];
    localStorage.setItem(`day${date}`, JSON.stringify(value));
    drinks.forEach((obj) => {
        obj.element.innerHTML = 0;
    });
    return value;
};

let storageDayGet = (date) => {
    let value = localStorage.getItem(`day${date}`);
    if (value !== null) {
        value = JSON.parse(value);
        drinks.forEach((obj) => {
            obj.element.innerHTML = value[obj.pos];
        })
    } else {
        value = storageDayInit(date)
    }
    return value;
};

let storageDaySet = (date, value) => {
    localStorage.setItem(`day${date}`, JSON.stringify(value));
    drinks.forEach((obj) => {
        obj.element.innerHTML = value[obj.pos];
    })
};

let storageDayHas = (date) => {
    return localStorage.getItem(`day${date}`) !== null;
};

let add = (drink, date) => {
    storageIndexAdd(date);
    if (!storageDayHas(date)) {
        storageDayInit(date);
    }
    let data = storageDayGet(date);
    ++data[drinks.get(drink).pos];
    storageDaySet(date, data);
};

let sub = (drink, date) => {
    if (!storageDayHas(date)) {
        storageDayInit(date);
    }
    let data = storageDayGet(date);
    if (data[drinks.get(drink).pos] > 0) {
        --data[drinks.get(drink).pos];
        storageDaySet(date, data);
    }
};

function kalendarz() {
    let calVal = calendar.value;
    calVal = calVal.slice(-4) + "-" + calVal.slice(0, 2) + "-" + calVal.slice(3, 5);

    if (calVal) {
        if (localStorage.getItem(`day ${calVal}`)) {
            let wysw = JSON.parse(localStorage.getItem(`day ${calVal}`));
            naglowek.innerHTML = `Dnia ${calVal} wypiłeś ${wysw[0]} szklanek wody, ${wysw[1]} piwa i ${wysw[2]} wódki`;
            currentDateCounter = JSON.parse(localStorage.getItem(`day ${calVal}`, currentDateCounter));
            water.innerHTML = currentDateCounter[0];
            beer.innerHTML = currentDateCounter[1];
            wodka.innerHTML = currentDateCounter[2];
        }

    } else {
        currentDateCounter = JSON.parse(localStorage.getItem(`day${date}`, currentDateCounter));
        water.innerHTML = currentDateCounter[0];
        beer.innerHTML = currentDateCounter[1];
        wodka.innerHTML = currentDateCounter[2];
        naglowek.innerHTML = null;
    }
}

// events //
const handleAddDelClick = (e) => {
    let button = e.currentTarget;
    if (e.currentTarget.classList.contains('drink__buttons--add')) {
        add(button.getAttribute('data-key'), currentDate);
    } else {
        sub(button.getAttribute('data-key'), currentDate);
    }
};

const handleDelAllClick = (e) => {
    storageDayInit(currentDate);
};

addButtons.forEach(button => button.addEventListener('click', handleAddDelClick));
delButtons.forEach(button => button.addEventListener('click', handleAddDelClick));
delAllButton.addEventListener('click', handleDelAllClick);

// START //

storageIndexInit();
storageDayGet(currentDate);