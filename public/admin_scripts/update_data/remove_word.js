'use strict';

import {removeModal} from '../show_modal.js';
import {getDataAPI} from '../../admin.js';
import {showAlert} from '../show_alert.js';
import {showLoaderModal, hideLoaderModal} from "../loader.js";

// Remove category
async function removeWord(word_id) {
    showLoaderModal();
    const req = await fetch(`/remove-word?word_id=${word_id}`, {
        method: 'DELETE',
    });
    const res = await req.json();

    if (res.message === 'word was removed') {
        setTimeout(() => {
            document.querySelector('.table-main tbody').innerHTML = ``;
            getDataAPI();
            removeModal();
            hideLoaderModal();
            showAlert('Word was removed');
        }, 1020);
    }
}

export {removeWord};