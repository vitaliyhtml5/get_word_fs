'use strict';

import {addModalImage,addCategoryModal,addEditCategoryModal,addRemoveCategoryModal,addEditWordModal,addRemoveWordModal} from './add_content.js';
import {getWordIndex} from './get_word_index.js';
import {createCategory} from './update_data/create_category.js';
import {editCategory} from './update_data/edit_category.js';
import {removeCategory} from './update_data/remove_category.js';
import {editWord} from './update_data/edit_word.js';
import {removeWord} from './update_data/remove_word.js';
import {openDropdown} from './open_dropdown.js';
import {getAllCategory} from '../scripts/get_all_words.js';
import {checkUploadedImage} from './update_data/check_fields.js';

const overlay = document.querySelector('.overlay');

// Show modal with image
function showModalImage(words) {
    document.querySelectorAll('.td-image').forEach((el, index) => {
        el.onclick = () => {
            openModal();
            const id = document.querySelectorAll('.table-main tbody tr td:nth-child(1)')[index].textContent;
            getWordIndex(words, id);

            addModalImage(words[getWordIndex(words,id)].english, words[getWordIndex(words,id)].image);
            document.querySelector('.modal-img img').onerror = function() {
                this.src = 'img/broken-img.png';
                document.querySelector('.modal-img b').textContent = 'Image is missed';
            }
            closeModal(document.querySelector('.modal-img button'));
            closeModalOutside();
        }
    });
}

// Create a new category
function createCategoryModal(category) {
    document.querySelector('.create-categoty-btn').addEventListener('click', () => {
        addCategoryModal();
        openModal();
        document.querySelector('.modal input').focus();
        closeModal(document.querySelectorAll('.modal-confirm button')[1]);
        document.querySelector('.modal').addEventListener('submit', (e) => {
            e.preventDefault();
            createCategory(category);
        });
    });
}

// Edit current category
function editCategoryModal(category) {
    document.querySelectorAll('.action-list li:first-child').forEach((el, index) => {
        el.onclick = () => {
            addEditCategoryModal();
            openModal();
            const id = document.querySelectorAll('.table-main tbody tr td:nth-child(1)')[index].textContent;
            document.querySelector('.modal input').value = category[getWordIndex(category, id)].name;
            document.querySelector('.modal input').focus();
            closeModal(document.querySelectorAll('.modal-confirm button')[1]);

            document.querySelector('.modal').addEventListener('submit', (e) => {
                e.preventDefault();
                editCategory(category, category[getWordIndex(category, id)].id);
            });
        }
    });
}

// Remove category
function removeCategoryModal(category) {
    document.querySelectorAll('.action-list li:last-child').forEach((el, index) => {
        el.onclick = () => {
            const id = document.querySelectorAll('.table-main tbody tr td:nth-child(1)')[index].textContent;
            addRemoveCategoryModal(category[getWordIndex(category, id)].name);
            openModal();
            closeModal(document.querySelectorAll('.modal-confirm button')[1]);
            closeModalOutside();

            document.querySelector('.modal').addEventListener('submit', (e) => {
                e.preventDefault();
                removeCategory(category[getWordIndex(category, id)].id);
            });
        }
    });
}

// Edit current word
async function editWordModal(words) {
    let allCategories;
    const data = await getAllCategory();
    allCategories = data;
    
    document.querySelectorAll('.action-list li:first-child').forEach((el, index) => {
        el.onclick = () => {
            const id = document.querySelectorAll('.table-main tbody tr td:nth-child(1)')[index].textContent;
            addEditWordModal(words[getWordIndex(words, id)].english, words[getWordIndex(words, id)].transcription,words[getWordIndex(words, id)].russian);
            openModal();
            openDropdown(allCategories, words[getWordIndex(words, id)].category);
            closeModal(document.querySelectorAll('.modal-confirm button')[1]);

            document.querySelector('#file-upload').onchange = checkUploadedImage;
            
            document.querySelector('.modal').addEventListener('submit', (e) => {
                e.preventDefault();
                const chosenCategory = document.querySelector('.chosen-category');
                editWord(words[getWordIndex(words, id)].id,chosenCategory.textContent.slice(10),words[getWordIndex(words, id)].image);
            });
        }
    });
}

// Remove word
function removeWordModal(words) {
    document.querySelectorAll('.action-list li:last-child').forEach((el, index) => {
        el.onclick = () => {
            const id = document.querySelectorAll('.table-main tbody tr td:nth-child(1)')[index].textContent;
            addRemoveWordModal(words[getWordIndex(words, id)].image, words[getWordIndex(words, id)].english);
            openModal();

            document.querySelector('.modal img').onerror = function() {
                this.src = 'img/broken-img.png';
            }

            closeModal(document.querySelectorAll('.modal-confirm button')[1]);
            closeModalOutside();

            document.querySelector('.modal').addEventListener('submit', (e) => {
                e.preventDefault();
                removeWord(words[getWordIndex(words, id)].id);
            });
        }
    });
}

// Open modal
function openModal() {
    overlay.style.animation = 'openModal 0.8s forwards';
}

// Close modal
function closeModal(btn) {
    overlay.removeEventListener('click', removeModal);
    btn.addEventListener('click', removeModal);
    document.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
            removeModal();
        }
    });
}

// Close modal after click outside of modal
function closeModalOutside() {
    document.querySelector('.modal').addEventListener('click', e => e.stopPropagation());
    overlay.addEventListener('click', removeModal);
}

function removeModal() {
    overlay.style.animation = 'closeModal 0.5s forwards';
    overlay.innerHTML = '';
}

export {showModalImage, createCategoryModal, editCategoryModal, removeCategoryModal, closeModal, removeModal,editWordModal,removeWordModal};