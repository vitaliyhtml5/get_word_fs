'use strict'

// Show and hide loader
const loader = document.querySelector('.loader');

const showLoader = () => loader.style.display = 'block';
const hideLoader = () => loader.style.display = 'none';

const showLoaderModal = () => {
    showLoader();
    loader.classList.add('modal-loader');
}
const hideLoaderModal = () => {
    hideLoader();
    loader.classList.remove('modal-loader');
}

export {showLoader, hideLoader, showLoaderModal, hideLoaderModal};
        