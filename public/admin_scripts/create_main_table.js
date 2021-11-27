'use strict';

import {showModalImage,editCategoryModal,removeCategoryModal, editWordModal, removeWordModal} from './show_modal.js';
import {emptyStateWords} from './add_content.js';
import {hideEmptyPage,showEmptyPage,emptyState} from './empty_state.js';

// Create table + pagination
function createMainTable(words, type ='words') {
    const table = document.querySelector('.table-main tbody');
    const paginationBtn = document.querySelector('.load-word>button');
 
    // Load default table
    const numberRows = 10;
    let start; 
    let numberWords;

    if (words.length <= numberRows) {
        numberWords = words.length;
        paginationBtn.style.display = 'none';
    } else {
        numberWords = numberRows;
        paginationBtn.style.display = 'flex';
    }

    if (words.length === 0 && type === 'words') {
        showEmptyPage();
        emptyStateWords();
    } else if (words.length === 0 && type === 'category') {
        document.querySelector('.table-main-wrap').style.display = 'none';
        hideEmptyPage();
        emptyState('img/search.png', 'No categories yet');
    } else {
        document.querySelector('.error-page').style.display = 'none';
        document.querySelector('.table-main-wrap').style.display = 'block';
        hideEmptyPage();
        fillTable(0);
    }

    function fillTable(start) {
        for (let i = start; i < numberWords; i++) {
            if (type === 'words') {
                table.innerHTML += `
                <tr>
                    <td>${words[i].id}</td>
                    <td>${words[i].english}</td>
                    <td>${words[i].transcription}</td>
                    <td>${words[i].russian}</td>
                    <td class="td-image"><span class="material-icons">visibility</span>Show</td>
                    <td>${words[i].category}</td>
                    <td>
                        <ul class="action-list">
                            <li><span class="material-icons">edit</span>Edit</li>
                            <li><span class="material-icons">delete</span>Remove</li>
                        </ul>
                    </td>
                </tr>`;
            } else if (type === 'category') {
                table.innerHTML += `
                <tr>
                    <td>${words[i].id}</td>
                    <td>${words[i].name}</td>
                    <td>
                        <ul class="action-list">
                            <li><span class="material-icons">edit</span>Edit</li>
                            <li><span class="material-icons">delete</span>Remove</li>
                        </ul>
                    </td>
                </tr>`;
            }
        }
        loadMoreWords();
    }

    function loadMoreWords() {
        showModalImage(words);
        editCategoryModal(words);
        removeCategoryModal(words);
        if (type === 'words') {
            editWordModal(words);
            removeWordModal(words);
        }
        paginationBtn.onclick = (e) => {
            if ((numberWords + numberRows) < words.length) {
                numberWords += numberRows;
                fillTable(numberWords - numberRows);
            } else {
                let lastStart = numberWords;
                numberWords = words.length;
                fillTable(lastStart);
                e.target.style.display = 'none';
            }
        };
    }
}

export {createMainTable};