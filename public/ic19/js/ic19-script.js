// IC19 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor
/*
1) What does require('dotenv').config() do, and why must it be the first line in app.js?
It reads .env and loads each line into process.env before anything else runs.

2) What is the difference between res.send() and res.json()? When would you use each?
res.send() gives plain text while re.json() gives... well, javascript. Use res.send() when returning text messages or HTML snippets, while res.json() should be used when returning structured data such as an object.

3) Why must .env never be committed to GitHub?
*Stopped here cuz answers got revealed

4) On the droplet, MISSION_ZONE shows undefined. What are two ways you could fix this without committing .env to GitHub?
*Stopped here cuz answers got revealed
*/

const dl = document.getElementById('config-display');

async function loadConfig() {
  const res  = await fetch('/ic19/config');
  const data = await res.json();
  dl.innerHTML = '';
  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = key;
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
}

loadConfig();