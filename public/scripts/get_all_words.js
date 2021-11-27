'use strict';

// API get all words
async function getAllWords() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    const res = await fetch('/get-all-words');
    const data = await res.json();
    loader.style.display = 'none';
    return data;
}

async function getAllCategory() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    const res = await fetch('/get-category');
    const data = await res.json();
    loader.style.display = 'none';
    return data;
}

export {getAllWords, getAllCategory};