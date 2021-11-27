'use strict';

import {getWords} from '../script.js';

// Add favorite words into LocalStorage
function addFavWords(words) {
    const favBtn = document.querySelectorAll('.fav-btn');
    const word = document.querySelectorAll('.eng-word');
    const wordsEng = words.map(item => item.english);

    favBtn.forEach((el, index) => {
        el.onclick = () => {
            let indexFav = wordsEng.indexOf(word[index].textContent);
            // Add to storage
            if (!el.classList.contains('fav-btn_checked')) {
                if (!localStorage.getItem('favWords')) {
                    localStorage.setItem('favWords', words[indexFav].id);
                    el.classList.add('fav-btn_checked');
                } else {
                    checkUniqueness(words[indexFav].id, el);
                } 
            } else if (el.classList.contains('fav-btn_checked') && localStorage.getItem('favWords')) {
                //Remove from storage
                let storageArr = localStorage.getItem('favWords').split(',');
                const indexStorage = storageArr.findIndex(el => el === String(words[indexFav].id));
                storageArr.splice(indexStorage, 1);
                storageArr.length === 0 ? localStorage.removeItem('favWords') : localStorage.setItem('favWords', storageArr);
                el.classList.remove('fav-btn_checked');
            }  
        }
    });

    function checkUniqueness(newWord, star) {
        let storageArr = localStorage.getItem('favWords').split(',');

        if (!storageArr.includes(String(newWord))) {
            let storage = `${localStorage.getItem('favWords')},${newWord}`;
            localStorage.setItem('favWords', storage);
            star.classList.add('fav-btn_checked');
        }
    }
}

function checkFavWords(id, view) {
    let storageArr = localStorage.getItem('favWords').split(',');
    const favBtn = document.querySelectorAll('.fav-btn');

    if (view === 'single') {   
        if (!storageArr.includes(String(id))) {
            favBtn[0].classList.remove('fav-btn_checked');
        } else {
            favBtn[0].classList.add('fav-btn_checked');
        }
    }

    if (view === 'grid') {
        if (storageArr.includes(String(id))) return 'fav-btn_checked';
    }
}

function setFavWords(words) {
    if (!localStorage.getItem('favWords')) {
        document.querySelector('.word-single-wrap').style.display = 'none';
        document.querySelector('#favorite-word').innerHTML = `
        <div class="search-message fav-words-message">
            <img src="img/broken-img.png">
            <p>Favorite words need being added</p>
        </div>`;
    } else {
        let storageArr = localStorage.getItem('favWords').split(',');
        const favArr = [];

        for (let i in words) {
            if (storageArr.includes(String(words[i].id))) {
                favArr.push(words[i]);
            }
        }
        getWords(favArr);
    }
}

export {addFavWords, checkFavWords, setFavWords};