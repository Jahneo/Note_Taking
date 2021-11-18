//const cool = require('cool-ascii-faces');
const fs = require('fs');
const path = require("path");
const {db} = require('./Develop/db/db.json');

const express = require('express');
const apiRoutes = require('./Routes/dbRoutes');
const htmlRoutes = require('./Routes/htmlRoutes');
const PORT = process.env.PORT || 3080;
const app = express();
app.route(require('./Routes/dbRoutes'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/api/notes',(req,res)=> {
  let results = notes;
  if(req.query){
    results = filterByQuery(req.query,results);
  }
    res.json(results);
});
app.get('/api/notes/:id',(req,res)=> {
  const result = findById(req.params.id, db);
  if (result) {
  res.json(result);
    }else {
    res.status(404).send('Sorry can not find that page');
  }
});
app.post('/api/notes',(req, res) =>{
   //incoming post store in req.body
  req.body.id = db.length.toString();
  const notes = createNewNotes(req.body, db);
   res.json(notes);
});
app.delete('/api/notes:id', function (req, res) {
  //console.log(req.params.id);
  const deleteNotes = db.filter(item => item.id != req.params.id);
  notes = deleteNotes;
  return res.redirect('/');
});
const getDB = (formData = {}) => {
  let queryUrl = '/api/notes?';
  Object.entries(formData).forEach(([key,value]) => {
    queryUrl += '${key}=${value}&';
  });
  console.log(queryUrl);
}
function findById (id, notesArray) {
  const result = notesArray.filter(db => db.id == id)[0];
  return result;
}

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.id) {
    filteredResults = filteredResults.filter(db => db.id === query.id);
  }
  if (query.title) {
    filteredResults = filteredResults.filter(db => db.title === query.title);
  }
  
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
function deleteNotes(id,notesArray){
  for (let i = 0; i < notesArray.length; i++){
    let db = notesArray[i];
    if (db.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
          path.join(__dirname, './Develop/db/db.json'),
          JSON.stringify(notesArray, null, 2)
      );

      break;
  }
}
}
  

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
 