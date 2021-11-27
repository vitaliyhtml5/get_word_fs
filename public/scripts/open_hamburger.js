'use strict';

// Open, close hamburger menu
function openHamburger() {
    const btnMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('#aside');

    menu.style.animationName !== 'openMenu' ? openMenu() : closeMenu();

    function openMenu() {
        menu.style.animation = 'openMenu 0.8s ease-out forwards';
        btnMenu.textContent = 'close';
        document.body.style = 'height:100vh;overflow:hidden';
    }

    // Close menu
    document.querySelectorAll('.menu-item').forEach(el => el.onclick = () => closeMenu());
    
    function closeMenu() {
        menu.style.animation = 'closeMenu 0.8s ease-out forwards';
        btnMenu.textContent = 'menu';
        document.body.style = '';
        window.scrollTo(0,0);
    }
}

export {openHamburger};

