'use strict'

import {checkFields,checkUploadedImage,showDefaultLabel} from './check_fields.js';
import {showErrorInput, clearError} from './show_error.js';
import {showAlert} from '../show_alert.js';
import {showLoader,hideLoader} from "../loader.js";

// Add a new word
function createWord() {
    document.querySelector('#file-upload').onchange = checkUploadedImage;

    document.querySelector('.form-add-word').addEventListener('submit', (e) => {
        e.preventDefault();
        const chosenCategory = document.querySelector('.chosen-category');
        sendCreateWord(chosenCategory.textContent.slice(10));
    });
}

function sendCreateWord(category) {
    checkFields();
    const input = document.querySelectorAll('.modal input[type="text"]');
    const file = document.querySelector('#file-upload');
    const errorMessageFile = document.querySelector('.download-wrap+.error-message');

    if (file.value === '') {
        showErrorInput(file, errorMessageFile, 'Can\'t be blank');
        clearError(file, errorMessageFile);
    } else if (checkFields() && checkUploadedImage()) {
        let uploadFile = file.files[0];
        let fileData = new FormData();
        fileData.append('filedata', uploadFile);
        uploadImage(fileData);
    }

    async function uploadImage(fileData) {
        showLoader();
        const req = await fetch('/upload-image', {
            method: "POST", 
            body: fileData
        });
        const res = await req.json();
        if (res.message !== 'image was not uploaded') {
            const data = {
                english: input[0].value.toLowerCase().trim(),
                transcription: input[1].value.toLowerCase().trim(),
                russian: input[2].value.toLowerCase().trim(),
                image: res.image,
                category: category,
            }
            sendData(data);
        }
    }

    async function sendData(data) {
        const req = await fetch('/add-word', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await req.json();
        hideLoader();
        showAlert('Word was created');
        document.querySelectorAll('input').forEach(el => el.value = '');
        showDefaultLabel(document.querySelector('.download-wrap'));
    }
}

export {createWord};