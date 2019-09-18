"use strict";

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, WSASYSNOTREADY } from "constants";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Zmienne //

let addWater, remWater, addBeer, remBeer, addWodka, remWodka, remAll, water, beer, wodka, date, tablicaDaty, tablicaDrink, calendar, calButton, naglowek;


// Tablice //

addWater = document.querySelector('.water__buttonadd--js');
remWater = document.querySelector('.water__buttondel--js');

addBeer = document.querySelector('.beer__buttonadd--js');
remBeer = document.querySelector('.beer__buttondel--js');

addWodka = document.querySelector('.wodka__buttonadd--js');
remWodka = document.querySelector('.wodka__buttondel--js');

remAll = document.querySelector('.del__all--js');

water = document.querySelector('.water__no--js');
beer = document.querySelector('.beer__no--js');
wodka = document.querySelector('.wodka__no--js');

date = new Date().toISOString().slice(0, 10);
tablicaDaty = [date];
tablicaDrink = [water,beer,wodka];

// KALENDARZ //
calendar = document.querySelector('.datepicker--js');
calButton = document.querySelector('.calendar__button--js');
naglowek = document.querySelector('.inputText--js');

let calVal;

calButton.addEventListener('click', (e) => {
  kalendarz();
})

// FUNKCJE //

function sprawdzTablice(pozTab,nazwaPlynu) {
  if(!localStorage.getItem("tablicaDaty", date)) {
    localStorage.setItem("tablicaDaty", JSON.stringify(tablicaDaty)); }
    else {
      const x = JSON.parse(localStorage.getItem('tablicaDaty'));
      if( x[x.length-1] != date ) { 
        x.push(date);
        localStorage.setItem("tablicaDaty", JSON.stringify(x));
      }
    }
  
  if(!localStorage.getItem(`day ${date}`)) {
    let tablicaDrink = [0,0,0];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    }
    
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
    ++tablicaDrink[pozTab];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    ++nazwaPlynu.innerHTML;
}

function zmniejszLicznik(pozTab,nazwaPlynu) {
  if(localStorage.getItem(`day ${date}`)) {
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));

    if(tablicaDrink[pozTab] > 0) {  
    --tablicaDrink[pozTab];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    --nazwaPlynu.innerHTML;
    }
  }
}

function kalendarz () {
  let calVal = calendar.value;
  calVal = calVal.slice(-4) + "-" + calVal.slice(0,2) + "-" + calVal.slice(3, 5);

  if (calVal) {
    if (localStorage.getItem(`day ${calVal}`)) {
      let wysw = JSON.parse(localStorage.getItem(`day ${calVal}`));
      naglowek.innerHTML = `Dnia ${calVal} wypiłeś ${wysw[0]} szklanek wody, ${wysw[1]} piwa i ${wysw[2]} wódki`;
      tablicaDrink = JSON.parse(localStorage.getItem(`day ${calVal}`, tablicaDrink));
      water.innerHTML = tablicaDrink[0];
      beer.innerHTML = tablicaDrink[1];
      wodka.innerHTML = tablicaDrink[2];
    }
    
  }
  else {
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
    water.innerHTML = tablicaDrink[0];
    beer.innerHTML = tablicaDrink[1];
    wodka.innerHTML = tablicaDrink[2];
    naglowek.innerHTML=null;
  }
}


// START //

if(!localStorage.getItem(`day ${date}`)) {
  water.innerHTML = 0;
  beer.innerHTML = 0;
  wodka.innerHTML = 0;
  }
  else {
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));
    water.innerHTML = tablicaDrink[0];
    beer.innerHTML = tablicaDrink[1];
    wodka.innerHTML = tablicaDrink[2];
  }

// WODA //

addWater.addEventListener('click', (e) => {
  sprawdzTablice(0,water);
})

remWater.addEventListener('click', (e) => {
  zmniejszLicznik(0,water);
})

// PIWO //

addBeer.addEventListener('click', (e) => {
  sprawdzTablice(1,beer);
})

remBeer.addEventListener('click', (e) => {
  zmniejszLicznik(1,beer);
})

// WODKA //

addWodka.addEventListener('click', (e) => {
  sprawdzTablice(2,wodka);
})

remWodka.addEventListener('click', (e) => {
  zmniejszLicznik(2,wodka);
})

// USUN WSZYSTKO //

remAll.addEventListener('click', (e) => {
  if(localStorage.getItem(`day ${date}`)) {
  let tablicaDrink = [0,0,0];
  localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
  water.innerHTML = 0;
  beer.innerHTML = 0;
  wodka.innerHTML = 0;
  }
})
