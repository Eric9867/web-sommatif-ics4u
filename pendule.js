(function(window){
"use strict";

class Vec2d {
  constructor(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this._isVec = true;
  }

  produitScalaire(autre){
    return this.x * autre.x + this.y * autre.y;
  }

  produitVectoriel(autre){
    throw new Error('impossible u dumdum');
  }

  ajouter(autre){
    if(autre._isVec){
      this.x += autre.x;
      this.y += autre.y;
    } else {
      this.x += autre;
      this.y += autre;
    }
    return this;
  }

  multiplier(autre){
    this.x *= autre;
    this.y *= autre;
    return this;
  }

  diviser(autre){
    return multiplier(1 / autre);
  }

  copier(source){
    this.x = source.x;
    this.y = source.y;
    return this;
  }
}

var omega = 0;
var theta = 1;

const vecPos = new Vec2d();
const vecVel = new Vec2d();
const vecTmp1 = new Vec2d();

const TERRE_GRAVITE = 9.81;
const LONGUEUR_PENDULE = 256;
const ACCELERATION_Y = -10;

var dernierMomentReference = performance.now();

function calculerPosition(momentActuel){
	requestAnimationFrame(calculerPosition);

	let deltaT = (momentActuel - dernierMomentReference) / 1000;
	dernierMomentReference = momentActuel;

  // alpha = -g*sin(theta)/r
  // increment omega with alpha and theta with omega
  let alpha = -TERRE_GRAVITE * Math.sin(theta) / LONGUEUR_PENDULE * 10;
  omega += alpha * deltaT;
  theta += omega * deltaT;

  let elemCercle = document.querySelector(".cercle");

  elemCercle.style.left = `${LONGUEUR_PENDULE * Math.sin(theta)}px`;
  elemCercle.style.bottom = `${- LONGUEUR_PENDULE * Math.cos(theta) - window.innerHeight / 2}px`;

  document.querySelector("line").x1.baseVal.value = (window.innerWidth / 2);
  document.querySelector("line").y1.baseVal.value = (window.innerHeight / 2);
  document.querySelector("line").x2.baseVal.value = (window.innerWidth / 2 + LONGUEUR_PENDULE * Math.sin(theta));
  document.querySelector("line").y2.baseVal.value = (window.innerHeight / 2 + LONGUEUR_PENDULE * Math.cos(theta) - document.querySelector(".cercle").clientHeight / 2);
  document.querySelector("circle").cx.baseVal.value = (window.innerWidth / 2)
  document.querySelector("circle").cy.baseVal.value = (window.innerHeight / 2)

/*
  elemCercle.style.left = `${vecPos.x}px`;
  elemCercle.style.bottom = `${vecPos.y - 320}px`;

  vecTmp1.copier(vecVel);
	vecPos.ajouter(vecTmp1.multiplier(deltaT));
*/
}

window.addEventListener("load", function(){
});

requestAnimationFrame(calculerPosition);
})(window);
