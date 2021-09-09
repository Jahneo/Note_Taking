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
function findById (id, dbArray) {
  const result = dbArray.filter(db => db.id == id)[0];
  return result;
}

function filterByQuery(query, dbArray) {
  let filteredResults = dbArray;
  if (query.id) {
    filteredResults = filteredResults.filter(db => db.id === query.id);
  }
  if (query.title) {
    filteredResults = filteredResults.filter(db => db.title === query.title);
  }
  
  return filteredResults;
}

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });