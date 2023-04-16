'use strict';

const adviceContainer = document.querySelector('.advice--conteiner');
const alertModal = document.querySelector('.alert-modal');
const adviceNumber = document.querySelector('.advice--number');
const adviceText = document.querySelector('.advice');
const adviceBtn = document.querySelector('.draw--advice');

let clickCount = 0;

const showAdvice = async function () {
  //getting advice
  try {
    const res = await fetch('https://api.adviceslip.com/advice');

    if (!res.ok) throw new Error(`Wrong url ${err}`);

    const data = await res.json();
    const { advice, id: adviceId } = data.slip;

    generateAdvice(advice, adviceId);
  } catch (err) {
    adviceNumber.innerText = `Oh no!`;
    adviceText.innerText = `There went something wrong! ${err.name} (${err.message})`;
  }
};

const generateAdvice = function (advice, adviceId) {
  adviceNumber.innerText = `Advice #${adviceId}`;
  adviceText.innerText = `"${advice}"`;
};

adviceBtn.addEventListener('click', function () {
  showAdvice();
  checkRequestCount();
  clickCount++;
});

const checkRequestCount = function () {
  if (clickCount >= 2 && clickCount < 4) {
    alertModal.classList.add('drop');
    alertModal.classList.remove('hide');
    setTimeout(resetCounter, 2500);
  }
};
const resetCounter = function () {
  clickCount = 0;
  alertModal.classList.remove('drop');
  alertModal.classList.add('hide');
};
showAdvice();
