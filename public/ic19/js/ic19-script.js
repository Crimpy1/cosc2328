// IC19 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

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