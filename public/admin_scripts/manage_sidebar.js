'use strict';

//Show and hide sidebar
const sidebar = document.querySelector('#aside');
const sidebarBtn = document.querySelector('.hide-sidebar');

function manageSidebar() {
    sidebarBtn.addEventListener('click', () => {
        if (!sidebarBtn.classList.contains('show-sidebar')) {
            sidebarBtn.classList.add('show-sidebar');
            sidebar.style.display = 'none';
            sidebarBtn.title = 'Show sidebar';
        } else {
            sidebarBtn.classList.remove('show-sidebar');
            sidebar.style.display = 'block';
            sidebarBtn.title = 'Hide sidebar';
        }
    });
}

export {manageSidebar};