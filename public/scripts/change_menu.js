'use strict';

import {getCategory, getCategoryWithWords} from './get_category.js';
import {getWords} from '../script.js';
import {addContent, addSearchContent} from './add_content.js';
import {useFilter,addFilterInput, removePropagation} from './set_filter.js';
import {getSearchWords} from './get_search_words.js';
import {setFavWords} from './add_fav_words.js';

// Changing menu in sidebar
function changeMenu(allWords) {
    const clearSidebar = () => document.querySelectorAll('.nav-list li').forEach(el => el.classList.remove('nav-item_checked'));

    document.querySelectorAll('.menu-item').forEach((el, index) => {
        const category = getCategoryWithWords(allWords);

        el.addEventListener('click', () => {
            clearSidebar();
            el.classList.add('nav-item_checked');
            if (index === 0) {
                addContent(0);
                getWords(allWords);
                addFilterInput(allWords);
                removePropagation();
                document.querySelector('.filter-icon').addEventListener('click', () => useFilter(allWords));
            } else if (index > 0 && index < (category.length + 1)) {
                addContent(0);
                getWords(getCategory(allWords, category[index - 1]));
                document.querySelector('.filter-icon').style.display = 'none';
                document.querySelector('.sublist-menu').classList.add('nav-item_checked');
            } else if (index === (category.length + 1)) {
                addSearchContent();
                document.querySelector('.search-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    getSearchWords(allWords);
                });
            } else if (index === (category.length + 2)) {
                addContent(0);
                document.querySelector('.filter-icon').style.display = 'none';
                document.querySelector('.fav-btn').style.display = 'none';
                setFavWords(allWords);
            }
        });
    });
}

export {changeMenu};