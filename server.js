//const cool = require('cool-ascii-faces');
const fs = require('fs');
const path = require("path");
const {db} = require('./Develop/db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


  //returns index page 
  app.get('/',(req, res) => {
        res.send('Welcome to My Note Taking Challenge');
        res.sendFile(path.join(__dirname,'.Develop/public/index.html'))
    
});
//returns the notes.html page
  app.get('/notes',(req, res) => {
      res.sendFile(path.join(__dirname,'.Develop/public/notes.html'));
  });

  app.route('/api/notes')
      //.get('/api/notes',(req, res) => {
     // res.json({db});
     // })
/*
      .post('/api/notes',(req, res) => {
        res.sendFile(path.join(__dirname,'.Develop/public/notes.html'));
        let incomingNotes = req.body;
        let highestPossibleNotes = 80;
        for (let i = 0; i < db.length; i++) {
          let addNotes = db[i];
          if (addNotes.id > incomingNotes)
          addNotes =  incomingNotes.id;
        }
      })
      incomingNotes.id = highestPossibleNotes + 1;
*/
 //function to search notes 
  function findById(id, notesArray) {
    const result = notesArray.filter(db => db.id === id)[0];
    return result;
  }
 //function to create notes
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
  app.post('/api/notes',(req, res) => {
    //allow id's to be unique keys so increases after the last entry
      req.body.id = db.length.toString();
      //call on function to add new notes
      const db = createNewNotes (req.body, db);
      res.json(db);
  });
  
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });