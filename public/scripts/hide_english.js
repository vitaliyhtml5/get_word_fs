'use strict';

function hideEnglish() {
    const eng = document.querySelector('.word-single-wrap b');
    const sound = document.querySelector('.word-single-wrap i');
    let hide;
    showEnglish();

    document.querySelector('.eye-icon').onclick = function() {
        if (!hide) {
            hide = true;
            this.classList.add('eye-icon_off');
            eng.style.display = 'none';
            sound.style.display = 'none';  
        } else {
            showEnglish();
        }
    }

    function showEnglish() {
        document.querySelector('.eye-icon').classList.remove('eye-icon_off');
        hide = false;
        eng.style.display = 'block';
        sound.style.display = 'block';
    }
}

export {hideEnglish};

