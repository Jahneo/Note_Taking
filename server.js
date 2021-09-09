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

app.get('/api/db',(req,res)=> {
  let results = db;
  if(req.query){
    results = filterByQuery(req.query,results);
  }
    res.json(results);
});
app.get('/api/db/:id',(req,res)=> {
  const result = findById(req.params.id, db);
  if (result) {
  res.json(result);
    }else {
    res.status(404).send('Sorry can not find that page');
  }
});
app.post('/api/db',(req, res) =>{
   //incoming post store in req.body
  req.body.id = db.length.toString();
  const notes = createNewNotes(req.body, db);
   res.json(req.body);
});


function findById (id, notesArray) {
  const result = notesArray.filter(db => db.id == id)[0];
  return result;
}

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.id) {
    filteredResults = filteredResults.filter(db => db.id === query.id);
  }
<<<<<<< HEAD
<<<<<<< HEAD

=======
 //function to create notes
>>>>>>> feature/server
  function createNewNotes(body, notesArray){
      const db = body;
      notesArray.push(db);
      fs.writeFileSync(
          path.join(__dirname,'./Develop/db/db.json'),
          JSON.stringify({db:notesArray}, null,2)
      );
      return db;
  }
<<<<<<< HEAD
=======

>>>>>>> feature/server
  // function to get search results and return error if no results 
  app.get('/api/db/:id',(req, res) => {
      const result = findById(req.params.id, db);
      if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
  });
<<<<<<< HEAD
  app.post('/api/db/:id',(req, res) => {
=======
  app.post('/api/notes',(req, res) => {
>>>>>>> feature/server
    //allow id's to be unique keys so increases after the last entry
      req.body.id = db.length.toString();
      //call on function to add new notes
      const db = createNewNotes (req.body, db);
      res.json(db);
<<<<<<< HEAD
=======
  });
=======
  if (query.title) {
    filteredResults = filteredResults.filter(db => db.Title === query.Title);
  }
>>>>>>> feature/server
  
  return filteredResults;
}
function createNewNotes (body, notesArray) {
  const db= body;
  notesArray.push(db);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ db: notesArray }, null, 2)
  );
  //console.log(body);
  return db;
}

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
>>>>>>> feature/server
  });