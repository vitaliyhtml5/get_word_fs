'use strict';

import {showErrorInput, clearError} from './show_error.js'

// Check empty fields and their length
function checkFields() {
    const input = document.querySelectorAll('.modal input[type="text"]');
    const errorMessage = document.querySelectorAll('.error-message');
    let validation = false;

    for (let i = 0; i < input.length; i++) {
        if (input[i].value.length === 0) {
            showErrorInput(input[i], errorMessage[i], 'Can\'t be blank');
            clearError(input[i], errorMessage[i]);
            validation = false;
            break;
        } else if (input[i].value.length > 20) {
            showErrorInput(input[i], errorMessage[i], 'Max length is 20 chars');
            clearError(input[i], errorMessage[i]);
            validation = false;
            break;
        } else {
            validation = true;
        }
    }
    return validation;
}

function checkUniqueCategory(category) {
    let validation = false;
    const input = document.querySelector('.modal input');
    const errorMessage = document.querySelector('.error-message');

    for(let i in category) {
        if (category[i].name === input.value.toLowerCase()) {
            validation = false;
            showErrorInput(input, errorMessage, 'Category is already exist');
            clearError(input, errorMessage);
            break;
        }
        else {
            validation = true;
        }
    }
    return validation;
}

function checkUploadedImage() {
    const label = document.querySelector('.download-wrap');
    const file = document.querySelector('#file-upload');
    const errorMessageFile = document.querySelector('.download-wrap+.error-message');
    const fileList = file.files;
    let validation;

    if (file.value) {
        if (fileList[0].size > 2000000) {
            showErrorInput(file, errorMessageFile, 'Max size of image is 2 Mb');
            clearError(file, errorMessageFile);
            validation = false;
        } else if (fileList[0].type === 'image/jpeg' || fileList[0].type === 'image/png' || fileList[0].type === 'image/svg+xml') {
            validation = true;         
        } else {
            showErrorInput(file, errorMessageFile, 'Format of image is incorrect');
            clearError(file, errorMessageFile);
            validation = false;
        }
    }
    validation ? showUploadedImage(label,fileList[0].name) : showDefaultLabel(label);

    return validation;
}

function showUploadedImage(label,fileName) {
    label.innerHTML = `<span class="material-icons">check</span>${fileName}`;
    label.classList.add('image-uploaded');
}
function showDefaultLabel(label) {
    label.innerHTML = `<span class="material-icons">file_upload</span>Upload image (jpg, png, svg)`;
    label.classList.remove('image-uploaded');
}

export {checkFields,checkUniqueCategory,checkUploadedImage,showDefaultLabel};