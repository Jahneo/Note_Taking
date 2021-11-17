const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

router.get('/db', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

router.get('/api/db/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

module.exports = router;