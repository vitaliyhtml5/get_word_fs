'use strict';

// Show errors below input
function showErrorInput(input, error, text) {
    error.style.display = 'block';
    error.textContent = text;
    input.style.borderColor = '#ff6969';
}

function clearError(input, error) {
    input.addEventListener('input', () => {
        error.style.display = 'none';
        input.style.borderColor = '#b61ffb';
    });
}

export {showErrorInput, clearError};