// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

function buildPage(monsters, message, error, battle) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Monster Arena</title>
                <link rel="stylesheet" href="/hw10/css/hw10.css">
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <header>
                    <h1>Monster Arena</h1>
                </header>
                ${message ? `<p class="banner-success">${message}</p>` : ''}
                ${error ? `<p class="banner-error">${error}</p>` : ''}
                <div class="roster">
                    ${monsters.map(monster => `
                        <div class="monster-card">
                            <h2 class="monster-name">${monster.name}</h2>
                            <p class="monster-species">Species: ${monster.species}</p>
                            <p class="monster-stats">Attack: ${monster.attack}</p>
                            <p class="monster-stats">Defense: ${monster.defense}</p>
                            <p class="monster-stats">HP: ${monster.hp}</p>
                            <p class="monster-id">ID: ${monster.id}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="form-block">
                    <form id="forms" action="/hw10/recruit" method="POST">
                        <label for="name">Name:</label>
                        <input type="text" name="name" required>
                        <label for="species">Species:</label>
                        <input type="text" name="species" required>
                        <label for="attack">Attack:</label>
                        <input type="number" name="attack" required>
                        <label for="defense">Defense:</label>
                        <input type="number" name="defense" required>
                        <label for="hp">HP:</label>
                        <input type="number" name="hp" required>
                        <button type="submit">Recruit</button>
                    </form>
                </div>
                <div class="form-block">
                    <form id="forms" action="/hw10/retire" method="POST">
                        <label for="id">Retire Monster ID:</label>
                        <input type="number" name="id" required>
                        <button type="submit">Retire</button>
                    </form>
                </div>
                <div class="form-block">
                    <form id="forms" action="/hw10/battle" method="POST">
                        <button class="btn-battle" type="submit">Battle!</button>
                    </form>
                </div>

                ${battle ? `
                    <div class="battle-results">
                        <h2 class="battle-results">Battle Results</h2>
                        <h3 class="fighter-name">${battle.a.name}</h3>
                            <div class="fighter">
                                <p class="fighter-species">Species: ${battle.a.species}</p>
                                <div class="fighter-stats">
                                    <p>Attack=${battle.a.attack}</p>
                                    <p>Defense=${battle.a.defense}</p>
                                    <p>HP=${battle.a.hp}</p>
                                </div>
                                <p class="fighter-score">Score: ${battle.scoreA}</p>
                            </div>
                        <h3 class="fighter-name">${battle.b.name}</h3>
                        <div class="fighter">
                            <p class="fighter-species">Species: ${battle.b.species}</p>
                            <p class="fighter-stats">Stats: </p>
                                <div class="fighter-stats">
                                    <p>Attack=${battle.b.attack}</p>
                                    <p>Defense=${battle.b.defense}</p>
                                    <p>HP=${battle.b.hp}</p>
                                </div>
                            <p class="fighter-score">Score: ${battle.scoreB}</p>
                        </div>
                        <h3 class="winner">Winner - ${battle.winner}</h3>
                    </div>
                ` : ''}
            </body>
        </html>`
                }


const express = require('express');
const router  = express.Router();
const db = require('../db')

router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});

router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;