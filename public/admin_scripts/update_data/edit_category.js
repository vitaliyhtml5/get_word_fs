'use strict';

import {checkFields, checkUniqueCategory} from './check_fields.js';
import {removeModal} from '../show_modal.js';
import {showErrorInput, clearError} from './show_error.js';
import {getCategoryAPI} from '../../admin.js';
import {showAlert} from '../show_alert.js';
import {showLoaderModal, hideLoaderModal} from "../loader.js";

// Edit category
function editCategory(category, category_id) {
    const input = document.querySelector('.modal input');
    const errorMessage = document.querySelector('.error-message');

    if (checkFields() && checkUniqueCategory(category)) {
        const data = {
            category: input.value.toLowerCase().trim(),
            id: category_id
        }
        sendData(data);
    }

    async function sendData(data) {
        showLoaderModal();
        const req = await fetch('/edit-category', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await req.json();
        hideLoaderModal();

        if (res.message === 'non-english chars') {
            showErrorInput(input, errorMessage, 'Only English chars can be put');
            clearError(input, errorMessage);
        } else {
            document.querySelector('.table-main tbody').innerHTML = ``;
            getCategoryAPI();
            showAlert('Category was edited');
            removeModal();
        }
    } 
}

export {editCategory}