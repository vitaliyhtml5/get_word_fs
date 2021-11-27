'use strict';

import {showGrid} from './show_grid.js';

// Search word
let searchWords = [];

// API queries
function searchWordsAPI(words, param) {
    const data = [];

    for (let i in words) {
        if (words[i].english.indexOf(param) !== -1 || words[i].russian.indexOf(param) !== -1) {
            data.push(words[i]);
        }
    }
    return data;
}

function getSearchWords(words) {
    const input = document.querySelector('.search-form input');
    const messageWrap = document.querySelector('.search-message');
    const messageImg = document.querySelector('.search-message img');
    const messageText = document.querySelector('.search-message p');

    if (input.value === '') {
        showMessage('img/search.png', 'Try to search a word');
    } else {
        const res = searchWordsAPI(words, input.value.toLowerCase());
        searchWords = res;

        if (searchWords.length > 0) {
            document.querySelector('.words-grid-wrap').style.display = 'flex';
            messageWrap.style.display = 'none';
            showGrid(searchWords, true);
        } else {
            showMessage('img/no-results.png', 'Oops! No results found');
        }
    }
    
    function showMessage(src, text) {
        document.querySelector('.words-grid-wrap').style.display = 'none';
        messageWrap.style.display = 'flex';
        messageImg.src = src;
        messageText.textContent = text;
    }
}

export {getSearchWords};