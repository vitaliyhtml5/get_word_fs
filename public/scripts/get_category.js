'use strict';

function getCategory(words, category) {   
    const wordsByCategory = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i].category === category) {
            wordsByCategory.push(words[i]);
        }
    }
    return wordsByCategory;
}

function getCategoryWithWords(allWords) {
    const allCategories = allWords.map(item => item.category);
    const filterInputs = allCategories.filter((item, i, ar) => ar.indexOf(item) === i);
    return filterInputs;
}

export {getCategory, getCategoryWithWords};