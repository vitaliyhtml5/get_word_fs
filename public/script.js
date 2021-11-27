'use strict';

import {useSingleSlider} from './scripts/make_slider.js';
import {showGrid} from './scripts/show_grid.js';
import {useFilter,addFilterInput,removePropagation} from './scripts/set_filter.js';
import {changeMenu} from './scripts/change_menu.js';
import {addContent} from './scripts/add_content.js';
import {openHamburger} from './scripts/open_hamburger.js';
import {getCategoryWithWords} from './scripts/get_category.js';
import {showEmptyPage} from './admin_scripts/empty_state.js';
import {emptyStateWords} from './admin_scripts/add_content.js'; 

// API queries
import {getAllWords} from './scripts/get_all_words.js';

let allWords = [];

// Set categories in sidebar
function setCategories(allWords) {
    const categoryList = document.querySelector('.category-list');
    const category = getCategoryWithWords(allWords);
    for (let i in category) {
        categoryList.innerHTML += `<li class="menu-item">${category[i]}</li>`
    }
}

// Get all words
getAllWordsAPI();
async function getAllWordsAPI() {
    addContent(0);
    const res = await getAllWords();
    allWords = res;
    if (allWords.length === 0) {
        showEmptyPage();
        emptyStateWords();
    } else {
        setCategories(allWords);
        useSingleSlider(allWords);
        getWords(allWords);
        changeMenu(allWords);
        addFilterInput(allWords);
        removePropagation();
    }
}

// Change single word/grid
function getWords(words) {   
    useSingleSlider(words);
    let single = true;

    document.querySelector('.cards-view').addEventListener('click', () => {
        if (single) {
            showGrid(words);
            single = false;
        } else {
            useSingleSlider(words);
            single = true;
        }
    });
}

// Filter
document.querySelector('.filter-icon').addEventListener('click', () => useFilter(allWords));

//Hamburger menu
document.querySelector('.hamburger-menu').addEventListener('click', openHamburger);

export {getWords};