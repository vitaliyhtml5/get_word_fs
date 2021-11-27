'use sctrict';

//show errors
function emptyState(img, text) {
    const errorPage = document.querySelector('.error-page');
    errorPage.style.display = 'block';
    errorPage.innerHTML = `
        <img src="${img}">
        <p>${text}</p>`;
}

const hideEmptyPage = () => document.querySelector('.empty-page').style.zIndex = '-1';
const showEmptyPage = () => document.querySelector('.empty-page').style.zIndex = '10';

export {emptyState,showEmptyPage,hideEmptyPage};