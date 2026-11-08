// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Gigi Kahlor

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextId = 1;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
  res.json ({
    license: process.env.PI_LICENSE,
    station: process.env.STATION_NAME,
    alert: process.env.ALERT_LEVEL
  })
});

router.get('/cases', (req, res) => {
    res.json(cases);
});

router.post('/cases', (req, res) => {
    const newCase = {
        suspect: req.body.suspect,
        location: req.body.location,
        notes: req.body.notes
    };
    if (!newCase.suspect || !newCase.location) {
        return res.status(400).json({ error: 'Suspect and location required' });
    } else {
        newCase.id = nextId++;
        newCase.timestamp = new Date().toISOString();
        cases.push(newCase);
        return res.status(201).json(newCase);
    }
});

module.exports = router;