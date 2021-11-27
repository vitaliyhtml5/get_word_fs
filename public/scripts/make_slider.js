'use strict';

import {hideEnglish} from './hide_english.js';
import {addFavWords, checkFavWords} from './add_fav_words.js';

// Single slider
function useSingleSlider(words) {   
    document.querySelector('.word-single-wrap').style.display = 'flex';
    document.querySelector('.words-grid-wrap').style.display = 'none';
    document.querySelector('.cards-view').textContent = 'grid_view';
    document.querySelector('.random-icon').style.display = 'block';
    document.querySelector('.random-icon').classList.add('random-icon_off');
    document.querySelector('.eye-icon').style.display = 'block';

    const quantity = document.querySelector('.word-single-wrap .counter');
    const img = document.querySelector('.word-img-wrap img');
    const eng = document.querySelector('.word-single-wrap b');
    const sound = document.querySelector('.word-single-wrap i');
    const ru = document.querySelector('.word-single-wrap span');
    const btn = document.querySelectorAll('.word-single-wrap .btn-wrap button');
    const getRandom = () => Math.floor(Math.random() * words.length);
    let counter = 0;
    let random = false;
    
    changeSlider();
    hideEnglish();
    clearRandom();
    addFavWords(words);

    btn[0].addEventListener('click', moveSliderBack);
    btn[1].addEventListener('click', moveSliderForward);
    document.addEventListener('keydown', e => {
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            moveSliderForward();
        }
    });
    document.addEventListener('keydown', e => {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            moveSliderBack();
        }
    });

    function moveSliderForward() {
        random === false ? counter++ : counter = getRandom();

        if (counter === words.length) {
            counter = 0;
        }
        changeSlider();
    }

    function moveSliderBack() {
        counter--;
        if (counter < 0 ) {
            counter = words.length - 1;
        }
        changeSlider();
    }

    function changeSlider() {
        quantity.textContent = `${counter+1}/${words.length}`;
        img.src = `img/words/${words[counter].image}`;
        eng.textContent = words[counter].english;
        sound.textContent = words[counter].transcription;
        ru.textContent = words[counter].russian;
        if (localStorage.getItem('favWords')) {
            checkFavWords(words[counter].id, 'single');
        }
        img.onerror = () => {
            img.src = 'img/broken-img.png';
            img.title = 'Image is missed';
        };
    }
    
    // Switch to random order
    document.querySelector('.random-icon').onclick = function() {
        if (!random) {
            this.classList.remove('random-icon_off');
            random = true;
            btn[0].style.display = 'none';
            btn[1].textContent = 'Random';
            btn[1].classList.add('random-btn');
        } else {
            clearRandom();
        }
    }
    function clearRandom() {
        document.querySelector('.random-icon').classList.add('random-icon_off');
        random = false;
        btn[0].style.display = 'block';
        btn[1].textContent = 'Next';
        btn[1].classList.remove('random-btn');
    }
}

export {useSingleSlider}