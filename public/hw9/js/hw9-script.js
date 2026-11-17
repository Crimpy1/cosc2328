// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor
/*
What does require('dotenv').config() do, and how does process.env.PI_LICENSE in hw9-routes.js get its value even though dotenv is not called there?
dotenv.config() loads variables from a .env file into process.env. process.env is shared while the Node.js process runs.

In IC20 your data was submitted with a <form> and e.preventDefault(). In HW9 there is no <form>. What changed? Why doesn't a plain <button> outside a form trigger a page reload?
The click handler reads the inputs and sends the data with fetch() instead of submitting a form. A plain button outside a form has no default submit action, so it does not reload the page.

What happens to the case list if the Docker container restarts? Why? What would you need to add to make the data survive a restart?
The case list is stored in a container dependent array, so it is lost when the container restarts. To make the data survive a restart, it would need to be stored in some form of persistent storage.

Your POST route returns 400 when suspect is missing. Where does the browser-side code receive that 400? How does response.ok help distinguish a 400 from a 201?
The browser gets the 400 in the response returned by the fetch. Response.ok is false for a 400 and true for a 201, so the code can tell they are different.
*/

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

