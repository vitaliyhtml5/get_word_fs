'use sctrict';

// Add main content
function addContent(index) {
    const content = document.querySelectorAll('.words-section');
    content.forEach(el => el.innerHTML = ``);
    document.querySelector('#search-word').innerHTML = ``;

    content[index].innerHTML = `
        <ul class="set-word-wrap">
            <li class="material-icons random-icon random-icon_off" title="Random word">rocket</li>
            <li class="material-icons eye-icon" title="Show or hide English">visibility</li>
            <li class="material-icons cards-view" title="Card view">grid_view</li>
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
        <div class="word-single-wrap">
            <button class="fav-btn material-icons" title="Mark as favorite">star</button>
            <div class="counter"></div>
            <div class="word-img-wrap">
                <img>
            </div>
            <b class="eng-word"></b>
            <i></i>
            <span></span>
            <div class="btn-wrap">
                <button class="button-main">Back</button>
                <button class="button-main">Next</button>
            </div>
        </div>
        <div class="words-grid-wrap">
            <div class="load-word"><button class="button-main"><span class="material-icons">restart_alt</span>Add more</button>
            </div>
        </div>`;
}

function addSearchContent() {
    document.querySelectorAll('.words-section').forEach(el => el.innerHTML = ``);

    document.querySelector('#search-word').innerHTML = `
        <div class="set-word-wrap search-form">
            <form class="search-form">
                <input type="text" autofocus>
                <button class="button-main">Search</button>
            </form>
        </div>
        <div class="search-message">
            <img src="img/search.png">
            <p>Try to search a word</p>
        </div>
        <div class="words-grid-wrap">
            <div class="load-word"><button class="button-main"><span class="material-icons">restart_alt</span>Add more</button>
            </div>
        </div>`;
}

export {addContent, addSearchContent};