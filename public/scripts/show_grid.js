'use strict';

import {addFavWords, checkFavWords} from './add_fav_words.js';

// Show grid of words
function showGrid(words, onlyGridsMenu = false) {
    if (!onlyGridsMenu) {
        document.querySelector('.word-single-wrap').style.display = 'none';
        document.querySelector('.cards-view').textContent = 'crop_square';
        document.querySelector('.random-icon').style.display = 'none';
        document.querySelector('.eye-icon').style.display = 'none';
    }
    
    const gridWrap = document.querySelector('.words-grid-wrap');
    clearGrids();
    gridWrap.style.display = 'flex';

    let numberWords;
    if (words.length <= 9) {
        numberWords = words.length;
        document.querySelector('.words-grid-wrap .load-word button').style.display = 'none';
    } else {
        numberWords = 9;
    }

    addWords(0);
    function addWords(start) {
        let favCheked;
        for (let i = start; i < numberWords; i++) {
            localStorage.getItem('favWords') ? favCheked = checkFavWords(words[i].id, 'grid') : '';
            gridWrap.innerHTML += `
            <div class="words-grid">
                <button class="fav-btn material-icons ${favCheked}" title="Mark as favorite">star</button>
                <img src="img/words/${words[i].image}">
                <b class="eng-word">${words[i].english}</b>
                <i>${words[i].transcription}</i>
                <span>${words[i].russian}</span>
            </div>`;
        }
        document.querySelectorAll('.words-grid img').forEach(el => {
            el.onerror = () => {
                el.src = 'img/broken-img.png';
                el.title = 'Image is missed';
            };
        });

        if (document.querySelector('.fav-words').classList.contains('nav-item_checked')) {
            document.querySelectorAll('.fav-btn').forEach(el => el.style.display = 'none');
        }
        if (document.documentElement.clientWidth < 769) {
            gridWrap.innerHTML += `<a href="#header" class="link-top material-icons">expand_less</a>`;
        }
        addFavWords(words);
        loadMoreWords();
    }
    
    function loadMoreWords() {
        const btn = document.querySelector('.words-grid-wrap .load-word button');
        btn.addEventListener('click', (e) => {
            if ((numberWords + 9) <= words.length) {
                numberWords += 9;
                addWords(numberWords - 9);
            } else {
                let lastStart = numberWords;
                numberWords = words.length;
                e.target.style.display = 'none';
                addWords(lastStart);
            }
        });
    }

    // Default clear grids
    function clearGrids() {
        gridWrap.innerHTML = `<div class="load-word"><button class="button-main"><span class="material-icons">restart_alt</span>Add more</button></div>`;
    }
}

export {showGrid};