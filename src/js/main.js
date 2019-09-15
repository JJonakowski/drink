"use strict";

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

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

// Tablice //

const addWater = document.querySelector('.water__buttonadd--js');
const remWater = document.querySelector('.water__buttondel--js');

const addBeer = document.querySelector('.beer__buttonadd--js');
const remBeer = document.querySelector('.beer__buttondel--js');

const addWodka = document.querySelector('.wodka__buttonadd--js');
const remWodka = document.querySelector('.wodka__buttondel--js');

const remAll = document.querySelector('.del__all--js');

const water = document.querySelector('.water__no--js');
const beer = document.querySelector('.beer__no--js');
const wodka = document.querySelector('.wodka__no--js');

const date = new Date().toISOString().slice(0, 10);
let tablicaDaty = [date];
let tablicaDrink = [water,beer,wodka];

// FUNKCJE //

function sprawdzTablice(x,y) {
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
    ++tablicaDrink[x];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    ++y.innerHTML;
}

function zmniejszLicznik(x,y) {
  if(localStorage.getItem(`day ${date}`)) {
    tablicaDrink = JSON.parse(localStorage.getItem(`day ${date}`, tablicaDrink));

    if(tablicaDrink[x] > 0) {  
    --tablicaDrink[x];
    localStorage.setItem(`day ${date}`, JSON.stringify(tablicaDrink));
    --y.innerHTML;
    }
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
