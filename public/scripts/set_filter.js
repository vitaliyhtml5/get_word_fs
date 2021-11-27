'use strict';

import {getWords} from '../script.js';
import {getCategoryWithWords} from './get_category.js';

// Set filter 
function setFilter(words) {
    const category = document.querySelectorAll('.filter-wrap input');   
    const wordsByCategory = [];
    for (let i = 0; i < words.length; i++) {
        category.forEach(el => {
            if (el.checked && words[i].category === el.value) {
                wordsByCategory.push(words[i]);
            }
        });
    }
    if (wordsByCategory.length === 0) {
        return words;
    } else {
        return wordsByCategory;
    } 
}

function useFilter(words) {
    document.querySelector('.filter-icon').style.display = 'block';
    const filterWrap = document.querySelector('.filter-wrap');
    const filterBtn = document.querySelectorAll('.filter-btn-wrap button');
    const openFilter = () => filterWrap.style.display = 'flex';
    const closeFilter = () => filterWrap.style.display = 'none';

    openFilter();

    filterBtn[0].addEventListener('click', () => {
        let filtereWords = setFilter(words)
        getWords(filtereWords);
        closeFilter();
    });
    filterBtn[1].addEventListener('click', closeFilter);
}

function addFilterInput(allWords) {
    const categoryWrap = document.querySelector('.category-wrap');
    const filterInputs = getCategoryWithWords(allWords);
    for (let i in filterInputs) {
        categoryWrap.innerHTML += `
        <label><input type="checkbox" value="${filterInputs[i]}"><span></span>${filterInputs[i]}</label>`;
    }    
}

function removePropagation() {
    const filterWrap = document.querySelector('.filter-wrap');
    document.querySelector('.filter-icon').addEventListener('click', e => e.stopPropagation());
    filterWrap.addEventListener('click', e => e.stopPropagation());
    document.body.onclick = () => {
        if (filterWrap.style.display = 'flex') filterWrap.style.display = 'none';
    }
}

export {setFilter, useFilter, addFilterInput, removePropagation};