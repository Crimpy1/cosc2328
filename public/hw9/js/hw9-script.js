// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

async function loadCredentials() {
    const res  = await fetch('/hw9/credentials');
    const data = await res.json();
    const credentials = document.getElementById('credentials');
    credentials.innerHTML = '';
    Object.entries(data).forEach(([key, value]) => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = key;
        dd.textContent = value;
        credentials.append(dt, dd);
    });

}

async function loadCases() {
    const res  = await fetch('/hw9/cases');
    const data = await res.json();
    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';
    if (data.length === 0) {
        caseList.innerHTML = '<li class="empty-msg">No cases filed yet.</li>';
    } else {
        for (const eachCase of data) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="case-id">${eachCase.id}</div>
                <div class="case-suspect">${eachCase.suspect}</div>
                <div class="case-location">${eachCase.location}</div>
                <div class="case-notes">${eachCase.notes}</div>
                <div class="case-ts">${eachCase.timestamp}</div>
            `;
            caseList.append(li);
        }
    }
}

const logBtn = document.getElementById('log-btn');
logBtn.addEventListener('click', async () => {
    const suspect = document.getElementById('suspect').value;
    const location = document.getElementById('location').value;
    const notes = document.getElementById('notes').value;
    const res = await fetch('/hw9/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspect, location, notes })
    });
    if (res.ok) {
        document.getElementById('suspect').value = '';
        document.getElementById('location').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('log-status').textContent = '';
        loadCases();
    } else if (!res.ok) {
        const error = await res.json();
        document.getElementById('log-status').textContent = error.error;
    }
});

loadCredentials();
loadCases();

