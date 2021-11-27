'use strict';

import {showLoader,hideLoader} from "./loader.js";

// Get json and csv files
function uploadFile() {
    const file = document.querySelectorAll('.upload-file');
    uploadAllData();

    function uploadAllData() {
        showLoader();
        uploadData('/download-json', file[0]);
        setTimeout(() => {
            uploadData('/download-csv', file[1]).then(() => hideLoader());
        },2000);
    }

    async function uploadData(endpoint, file) {
        const req = await fetch(endpoint);
        file.setAttribute('href', endpoint);
    }
}

export {uploadFile};