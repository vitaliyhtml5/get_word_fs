'use strict';

//add content for each menu
function addContent(index) {
    const menu = document.querySelectorAll('.data-wrap');
    if (index === 0) {
        menu[0].innerHTML = `
        <div class="tools-wrap">
            <form class="search-form">
                <input type="text" autofocus>
                <button class="button-main">Search</button>
            </form>
            <span class="filter-clear"></span>
            <ul class="set-word-wrap">
                <li class="material-icons filter-icon" title="Filter">filter_alt</li>
            </ul>
            <div class="filter-wrap">
                <h3>Choose category</h3>
                <div class="category-wrap"></div>
                <div class="filter-btn-wrap">
                    <button class="button-main" type="button">Apply filter</button>
                    <button class="button-main" type="button">Cancel</button>
                </div>
            </div>
        </div>
        <div class="table-main-wrap">
            <table class="table-main">
                <thead>
                    <tr>
                        <th>id<button class="material-icons sort-btn">south</button></th>
                        <th>english<button class="material-icons sort-btn">south</button></th>
                        <th>transcription</th>
                        <th>russian<button class="material-icons sort-btn">south</button></th>
                        <th>image</th>
                        <th>category<button class="material-icons sort-btn">south</button></th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div> 
        <div class="load-word">
            <button class="button-main">
            <span class="material-icons">restart_alt</span>Show more</button>
        </div>`;
    } else if (index === 1) {
        menu[1].innerHTML = `
        <div class="tools-wrap">
            <form class="search-form">
                <input type="text" autofocus>
                <button class="button-main">Search</button>
            </form>
            <button class="button-main create-categoty-btn"><span class="material-icons">add_circle_outline</span> New category</button>
        </div>
        <div class="table-main-wrap">
            <table class="table-main">
                <thead>
                    <tr>
                        <th>id<button class="material-icons sort-btn">south</button></th>
                        <th>category<button class="material-icons sort-btn">south</button></th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="load-word">
            <button class="button-main">
            <span class="material-icons">restart_alt</span>Show more</button>
        </div>`;
    } else if (index === 2) {
        menu[2].innerHTML = `
        <form class="modal form-add-word" enctype="multipart/form-data">
            <div class="dropdown-list-wrap">
                <ul class="dropdown-list"></ul>
            </div>
            <label>Add english:</label>
            <input type="text" autofocus><span class="error-message"></span>
            <label>Add transcription:</label>
            <input type="text"><span class="error-message"></span>
            <label>Add russian:</label>
            <input type="text"><span class="error-message"></span>
            <label class="download-wrap" for="file-upload"><span class="material-icons">file_upload</span>Upload image (jpg, png, svg)</label>
            <span class="error-message"></span>
            <input type="file" name="filedata" id="file-upload">
            <button class="button-main">Add word</button>
        </form>`;
    } else if (index === 3) {
        menu[3].innerHTML = `
        <div class="export-wrap">
            <h3>Download json-file:</h3>
            <a class="upload-file" download><span class="material-icons">download</span>words.json</a>
            <h3>Download csv-file:</h3>
            <a class="upload-file" download><span class="material-icons">download</span>words.csv</a>
        </div>`
    }
}

// Add content for modal with image
function addModalImage(word, image) {
    document.querySelector('.overlay').innerHTML = `
    <div class="modal modal-img">
        <img src="img/words/${image}">
        <b>${word}</b>
        <button class="button-main">Close</button>
    </div>`;
}

function addCategoryModal() {
    document.querySelector('.overlay').innerHTML = `
    <form class="modal modal-confirm modal-add-category">
        <h3>Create category</h3>
        <label>Add category name:</label>
        <input type="text" autofocus>
        <span class="error-message"></span>
        <div class="btn-wrap">
            <button class="button-main">Create</button>
            <button class="button-main" type="button">Close</button>
        </div>
    </form>`;
}

function addEditCategoryModal() {
    document.querySelector('.overlay').innerHTML = `
    <form class="modal modal-confirm modal-add-category">
        <h3>Edit category</h3>
        <label>Add a new name:</label>
        <input type="text" autofocus>
        <span class="error-message"></span>
        <div class="btn-wrap">
            <button class="button-main">Edit</button>
            <button class="button-main" type="button">Close</button>
        </div>
    </form>`;
}

function addRemoveCategoryModal(name) {
    document.querySelector('.overlay').innerHTML = `
    <form class="modal modal-confirm modal-remove-category">
        <h3>Remove category</h3>
        <p>Are you sure you want to remove <b>${name}</b> category? All words of this category will be deleted</p>
        <div class="btn-wrap">
            <button class="button-main button-remove">Remove</button>
            <button class="button-main" type="button">Cancel</button>
        </div>
    </form>`;
}

function addRemoveWordModal(img, name) {
    document.querySelector('.overlay').innerHTML = `
    <form class="modal modal-confirm modal-remove-words">
        <h3>Remove word</h3>
        <p>Are you sure you want to remove it?</p>
        <div class="modal-preview-word">
            <img src="img/words/${img}">
            <b>${name}</b>
        </div>
        <div class="btn-wrap">
            <button class="button-main button-remove">Remove</button>
            <button class="button-main" type="button">Cancel</button>
        </div>
    </form>`;
}

function addEditWordModal(english, transcription, russian) {
    document.querySelector('.overlay').innerHTML = `
    <form class="modal modal-confirm form-add-word" enctype="multipart/form-data">
        <h3>Edit word</h3>
        <div class="dropdown-list-wrap">
            <ul class="dropdown-list"></ul>
        </div>
        <label>Edit english:</label>
        <input type="text" value="${english}"><span class="error-message"></span>
        <label>Edit transcription:</label>
        <input type="text" value="${transcription}"><span class="error-message"></span>
        <label>Edit russian:</label>
        <input type="text" value="${russian}"><span class="error-message"></span>
        <label class="download-wrap" for="file-upload"><span class="material-icons">file_upload</span>Upload image (jpg, png, svg)</label>
        <span class="error-message"></span>
        <input type="file" name="filedata" id="file-upload">
        <div class="btn-wrap">
            <button class="button-main">Edit</button>
            <button class="button-main" type="button">Close</button>
        </div>
    </form>`;
}

function addAlert(text) {
    document.querySelector('.alert-wrap').innerHTML = `
        <span class="material-icons">error_outline</span>
        <p>${text}</p>
        <button class="material-icons">close</button>`;
}

function emptyStateWords() {
    document.querySelector('.empty-page').innerHTML = `
    <img src="img/search.png">
    <b>No words yet</b>`;
}

function emptyStateAddWord() {
    document.querySelector('.empty-page').innerHTML = `
    <img src="img/search.png">
    <b>Category should be created first</b>
    <button class="button-main add-category-empty">Create category</button>`;
}

export {addContent,addAlert,addModalImage,addCategoryModal,addEditCategoryModal,addRemoveCategoryModal,addEditWordModal,addRemoveWordModal,emptyStateWords,emptyStateAddWord};