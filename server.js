const fs = require('fs');
const path = require('path');
const {db} = require('./Develop/db/db');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(3000, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  // function to search notes 
  function findById(id, notesArray) {
    const result = notesArray.filter(db => db.id === id)[0];
    return result;
  }

  function createNewNotes(body, notesArray){
      const db = body;
      notesArray.push(db);
      fs.writeFileSync(
          path.join(__dirname,'./Develop/db/db.json'),
          JSON.stringify({db:notesArray}, null,2)
      );
      return db;
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
  app.post('/api/db/',(req, res) => {
    //allow id's to be unique keys so increases after the last entry
      req.body.id = db.length.toString();
      //call on function to add new notes
      const db = createNewNotes (req.body, db);
      res.json(db);
  });