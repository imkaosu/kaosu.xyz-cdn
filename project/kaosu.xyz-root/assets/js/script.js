const filesDB = {
    "231": {
        name: "Animatronic_Memories.zip",
        size: "606 MB",
        type: "Archive (.zip)",
        username: "admin",
        verified: true,
        admin: true,
        banned: false,
        downloadUrl: "http://001.us.svr.kaosu-hosting.online:32644/231/Animatronic_Memories.zip"
    },
};

function getQueryParam(n) {
    return new URLSearchParams(window.location.search).get(n);
}

function createBadge(iconName, tooltip) {
    const b = document.createElement('span');
    b.className = 'badge';
    b.innerHTML = `
        <i class="material-icons">${iconName}</i>
        <span class="tooltip">${tooltip}</span>
    `;
    return b;
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getQueryParam('file');
    const div = document.getElementById('content');

    if (!id || !filesDB[id]) {
        div.innerHTML = `<div class="notfound"><h1>File not found.</h1><p>The file you are trying to reach cannot be found.</p></div>`;
        return;
    }

    const f = filesDB[id];

    if (f.banned) {
        div.innerHTML = `<div class="card banned">This file has been deleted.</div>`;
        return;
    }

    let badges = '';
    if (f.verified) {
        badges += createBadge('verified', 'This user is a verified poster.').outerHTML;
    } else {
        badges += createBadge('warning', 'This user is not verified — download with caution.').outerHTML;
    }
    if (f.admin) {
        badges += createBadge('shield', 'This user is a site Administrator.').outerHTML;
    }

    div.innerHTML = `
        <div class="card user-card">
            <span>${f.username}</span>
            ${badges}
        </div>

        <div class="card file-card">
            <h1>${f.name}</h1>
            <div class="file-info">
                <strong>Size:</strong> ${f.size}<br>
                <strong>Type:</strong> ${f.type}
            </div>
            <a href="${f.downloadUrl}" class="download-btn" download>Download File</a>
            <a href="mailto:abuse@kaosu-hosting.online subterfuge=Report%20File%20ID%20${id}" class="report-btn">Report this file</a>
        </div>`;

});
