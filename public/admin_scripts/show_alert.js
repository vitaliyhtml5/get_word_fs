'use strict'

import {addAlert} from './add_content.js'; 

// Open, close flash message
const alert = document.querySelector('.alert-wrap');

const showAlert = text => {
    addAlert(text);
    alert.style.animation = 'showAlert 3s forwards';
    closeAlert();
}

function closeAlert() {
    setTimeout(() => alert.style.animation = 'none', 3000);
    document.querySelector('.alert-wrap button').onclick = () => alert.style.animation = 'none';
}

export {showAlert};