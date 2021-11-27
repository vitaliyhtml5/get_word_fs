'use strict';

import {createMainTable} from './create_main_table.js';
import {clearSortState} from './sort_words.js';

//Open,close filter and get filtered results
function useFilter(words) {
    const filterWrap = document.querySelector('.filter-wrap');
    const filterBtn = document.querySelectorAll('.filter-btn-wrap button');
    const clearFilterBtn = document.querySelector('.filter-clear');
    const openFilter = () => filterWrap.style.display = 'flex';
    const closeFilter = () => filterWrap.style.display = 'none';

    // Open-close
    openFilter();
    document.body.onclick = () => {
        if (filterWrap.style.display = 'flex') closeFilter();
    }
    filterBtn[1].addEventListener('click', closeFilter);

    // Set filter
    filterBtn[0].onclick = getfilteredTable;
    clearFilterBtn.onclick = () => {
        document.querySelectorAll('.filter-wrap input').forEach(el => el.checked = false);
        getfilteredTable();
    }

    function getfilteredTable() {
        let filtereWords = setFilter(words);
        document.querySelector('.table-main tbody').innerHTML = ``;
        filtereWords.sort((a, b) => a.id > b.id ? 1 : -1);
        createMainTable(filtereWords);
        setClearFilter();
        clearSortState();
        closeFilter();
    }
}

function getFilter(words) {
    const categoryWrap = document.querySelector('.category-wrap');
    document.querySelector('.filter-icon').addEventListener('click', () => useFilter(words));
    const categoryAll = words.map(item => item.category);
    const category = Array.from(new Set(categoryAll));
    categoryWrap.innerHTML = ``;

    for (let i in category) {
        categoryWrap.innerHTML += ` 
        <label><input type="checkbox" value="${category[i]}"><span></span>${category[i]}</label>`;
    }
}

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

function setClearFilter() {
    const clearBtn = document.querySelector('.filter-clear');
    let countChecked = 0;
    document.querySelectorAll('.filter-wrap input').forEach(el => {
        if (el.checked) countChecked++;
    });

    if (countChecked > 0) {
        clearBtn.style.display = 'block';
        clearBtn.textContent = `Clear (${countChecked})`;
    } else {
        clearBtn.style.display = 'none';
    }
}

function removePropagation() {
    document.querySelector('.filter-icon').addEventListener('click', e => e.stopPropagation());
    document.querySelector('.filter-wrap').addEventListener('click', e => e.stopPropagation());
}

export {useFilter, getFilter, setFilter, removePropagation};

