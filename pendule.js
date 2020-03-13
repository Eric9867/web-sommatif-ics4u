(function(window){
"use strict";

var omega = 0; // rad/s
var theta = 1; // rad/s

const TERRE_GRAVITE = 9.81; // m/s^2
const LONGUEUR_PENDULE = 256; // m
const ACCELERATION_Y = -10; // m/s^2

var dernierMomentReference = performance.now();

function calculerPosition(momentActuel){
	requestAnimationFrame(calculerPosition);

	let deltaT = (momentActuel - dernierMomentReference) / 1000;
	dernierMomentReference = momentActuel;

  // alpha = -g*sin(theta)/r
  // increment omega with alpha and theta with omega
  let alpha = -TERRE_GRAVITE * Math.sin(theta) / LONGUEUR_PENDULE * 100;
  omega += alpha * deltaT;
  theta += omega * deltaT;

  let elemCercle = document.querySelector(".cercle");
  if(!elemCercle) return;

  elemCercle.style.left = `${LONGUEUR_PENDULE * Math.sin(theta)}px`;
  elemCercle.style.bottom = `${-LONGUEUR_PENDULE * Math.cos(theta) - window.innerHeight / 2}px`;

  let articleElem = document.querySelector("article");
  document.querySelector("line").x1.baseVal.value = articleElem.clientWidth / 2;
  document.querySelector("line").y1.baseVal.value = articleElem.clientHeight / 2;
  document.querySelector("line").x2.baseVal.value = articleElem.clientWidth / 2 + LONGUEUR_PENDULE * Math.sin(theta);
  document.querySelector("line").y2.baseVal.value = articleElem.clientHeight / 2 + LONGUEUR_PENDULE * Math.cos(theta) - elemCercle.clientHeight / 2;
  document.querySelector("circle").cx.baseVal.value = articleElem.clientWidth / 2;
  document.querySelector("circle").cy.baseVal.value = articleElem.clientHeight / 2;
}

requestAnimationFrame(calculerPosition);
})(window);
