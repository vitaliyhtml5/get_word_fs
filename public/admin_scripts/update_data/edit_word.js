'use strict';

import {getDataAPI} from '../../admin.js';
import {checkFields,checkUploadedImage} from './check_fields.js';
import {showErrorInput, clearError} from './show_error.js';
import {removeModal} from '../show_modal.js';
import {showAlert} from '../show_alert.js';
import {showLoaderModal, hideLoaderModal} from "../loader.js";

// Edit a word
function editWord(wordId, category, oldImage) {
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
        showLoaderModal();
        const req = await fetch('/upload-image', {
            method: "POST", 
            body: fileData
        });
        const res = await req.json();
        if (res.message !== 'image was not uploaded') {
            const data = {
                id: wordId,
                english: input[0].value.toLowerCase().trim(),
                transcription: input[1].value.toLowerCase().trim(),
                russian: input[2].value.toLowerCase().trim(),
                image: res.image,
                category: category,
                oldImage: oldImage
            }
            sendData(data);
        }
    }

    async function sendData(data) {
        const req = await fetch('/edit-word', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        setTimeout(() => {
            document.querySelector('.table-main tbody').innerHTML = ``;
            getDataAPI();
            removeModal();
            hideLoaderModal();
            showAlert('Word was edited');
        }, 1020);
    }
}

export {editWord};
