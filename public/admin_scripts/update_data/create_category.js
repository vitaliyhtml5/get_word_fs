'use sctrict';

import {checkFields, checkUniqueCategory} from './check_fields.js';
import {removeModal} from '../show_modal.js';
import {showErrorInput, clearError} from './show_error.js';
import {getCategoryAPI} from '../../admin.js';
import {showAlert} from '../show_alert.js';
import {showLoaderModal, hideLoaderModal} from "../loader.js";

// Create a new category
function createCategory(category) {
    const input = document.querySelector('.modal input');
    const errorMessage = document.querySelector('.error-message');
 
    if (category.length === 0 && checkFields()) {
        const data = {
            category: input.value.toLowerCase().trim()
        }
        sendData(data);
    } else if (category.length > 0 && checkFields() && checkUniqueCategory(category)) {
        const data = {
            category: input.value.toLowerCase().trim()
        }
        sendData(data);
    }
   
    async function sendData(data) {
        showLoaderModal();
        const req = await fetch('/add-category', {
            method: 'POST',
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
            showAlert('Category was created');
            removeModal();
        }
    } 
}

export {createCategory};