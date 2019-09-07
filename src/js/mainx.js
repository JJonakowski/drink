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

// -- //

//const addGlass = document.querySelector('.drink__buttons--add--js');
//const remGlass = document.querySelector('.drink__buttons--del--js');
//const counter = document.querySelector('.drink__glass--no--js');
//const date = new Date().toISOString().slice(0, 10);
//const lastDay = document.querySelector('.drink__last--day--js');

// if(!localStorage.getItem(date)) {
  //localStorage.setItem(date, 0);
  //counter.innerHTML = 0; }
// else  {
  //counter.innerHTML = localStorage.getItem(date); }

//addGlass.addEventListener('click', (e) => {
//  localStorage.setItem(date, parseInt(localStorage.getItem(date)) +1);
//  counter.innerHTML= localStorage.getItem(date);
//})

//remGlass.addEventListener('click', (e) => {
//  const getCounter = localStorage.getItem(date);
//  if(getCounter > 0) {
//    localStorage.setItem(date, parseInt(localStorage.getItem(date)) -1);
//    counter.innerHTML= localStorage.getItem(date);
//  }
//})



// Tablice //

const addGlass = document.querySelector('.drink__buttons--add--js');
const remGlass = document.querySelector('.drink__buttons--del--js');
const counterr = document.querySelector('.drink__glass--no--js');
const date = new Date().toISOString().slice(0, 10);

const licznik =  [date, counterr];

if(localStorage.getItem('dzien')==null) {
  counterr.innerHTML = 0;
  //const licznik =  [date, 0];
  localStorage.setItem("dzien", JSON.stringify([date, 0]));
  counterr.innerHTML = licznik[1];
}
else {
  const li = JSON.parse(localStorage.getItem('dzien'));
  counterr.innerHTML= li[1];
}

addGlass.addEventListener('click', (e) => {
  const licznik = JSON.parse(localStorage.getItem('dzien'));
  const iloscSzklanek = ++licznik[1];
  localStorage.setItem("dzien", JSON.stringify(licznik));
  counterr.innerHTML = iloscSzklanek;
})

