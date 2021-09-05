const {db} = require('./Develop/db/db');
const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log(`API server now on port 3000!`);
  });
  // function to search notes 
  function findById(id, notesArray) {
    const result = notesArray.filter(db => db.id === id)[0];
    return result;
  }
  // function to get search results and return error if no results 
  app.get('/api/db/:id',(req, res) => {
      const result = findById(req.params.id, db);
      if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
  });