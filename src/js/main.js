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

const addGlass = document.querySelector('.drink__buttons--add--js');
const remGlass = document.querySelector('.drink__buttons--del--js');
const counterr = document.querySelector('.drink__glass--no--js');
const date = new Date().toISOString().slice(0, 10);
let tablicaDaty = [date];

if(!localStorage.getItem(`day ${date}`)) {
  counterr.innerHTML = "0";
  }
  else {
    counterr.innerHTML = localStorage.getItem(`day ${date}`);
  }

addGlass.addEventListener('click', (e) => {
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
    localStorage.setItem(`day ${date}`, 0);
    }
  
  localStorage.setItem(`day ${date}`, parseInt(localStorage.getItem(`day ${date}`)) +1);
  ++counterr.innerHTML;
})

remGlass.addEventListener('click', (e) => {
  if(localStorage.getItem(`day ${date}`) > 0) {  
  localStorage.setItem(`day ${date}`, parseInt(localStorage.getItem(`day ${date}`)) -1);
  --counterr.innerHTML;
  }
})