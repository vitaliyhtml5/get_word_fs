'use strict';

// Get index of word by id
function getWordIndex(words, id) {
    const idWords = words.map(item => item.id);
    const index = idWords.findIndex(el => el === Number(id));
    return index;
}

export {getWordIndex};