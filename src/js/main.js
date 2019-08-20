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

const addGlass = document.querySelector('.drink__buttons--add--js');
const remGlass = document.querySelector('.drink__buttons--del--js');
const counter = document.querySelector('.drink__glass--no--js');
const lastDay = document.querySelector('.drink__last--day--js');
const date = new Date().toISOString().slice(0, 10);
const getKey = localStorage.getItem('date');

counter.innerHTML = localStorage.getItem('counter');

if( getKey == null ) {
  localStorage.setItem('date', date);
  localStorage.setItem('counter', 0);
  counter.innerHTML = localStorage.getItem('counter');
}
else 
{
  if(getKey !== date) {
    const lastCounter = localStorage.setItem('lastCounter', counter.innerText);
    localStorage.setItem('counter', 0);
    counter.innerHTML = localStorage.getItem('counter');
    localStorage.setItem('date', date);
    lastDay.innerHTML = `Wczoraj wypiłeś: ${localStorage.getItem('lastCounter')} kieliszków!`;
  }
  else {
    if(localStorage.getItem('lastCounter')) {
    lastDay.innerHTML = `Wczoraj wypiłeś: ${localStorage.getItem('lastCounter')} kieliszków!`;
    }
  }
}

addGlass.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('counter', ++counter.innerText);
})

remGlass.addEventListener('click', (e) => {
  e.preventDefault();
  const getCounter = localStorage.getItem('counter');
  if(getCounter > 0) {
    localStorage.setItem('counter', --counter.innerText);
  }
})
