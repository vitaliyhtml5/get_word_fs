'use strict'

import {setFilter} from './use_filter.js';
import {createMainTable} from './create_main_table.js';
import {emptyState} from './empty_state.js';
import {clearSortState} from './sort_words.js';

// Search by EventTarget, ru, category
function searchWord(words, type = 'words') {
    const searchForm = document.querySelector('.search-form');
    const input = document.querySelector('.search-form input');
    const table = document.querySelector('.table-main-wrap');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchWords = [];
        if (type === 'words') {
            let filteredWords = setFilter(words);
            for (let i in filteredWords) {
                if (filteredWords[i].english.indexOf(input.value.toLowerCase()) !== -1 || filteredWords[i].russian.indexOf(input.value.toLowerCase()) !== -1) {
                    searchWords.push(filteredWords[i]);
                }
            }
        } else if (type === 'category') {
            for (let i in words) {
                if (words[i].name.indexOf(input.value.toLowerCase()) !== -1) {
                    searchWords.push(words[i]);
                }
            }
        }
 
        if (searchWords.length > 0) {
            table.style.display = 'block';
            document.querySelector('.error-page').style.display = 'none';
            clearSortState();
            searchWords.sort((a, b) => a.id > b.id ? 1 : -1);
            document.querySelector('.table-main tbody').innerHTML = ``;
            type === 'words' ? createMainTable(searchWords, 'words') : createMainTable(searchWords, 'category')  
        } else {
            table.style.display = 'none';
            emptyState('img/no-results.png', 'Oops! No results found');
        }
    });  
}

export {searchWord};