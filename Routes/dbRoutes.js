const router = require("express").Router();
const {
  notes
} = require('../Develop/db/db');
const {
    deleteNotes,
    createNewNotes,
} = require('../server.js');
router.get('/api/notes',(req,res)=> {
    let results = db;
    if(req.query){
      results = filterByQuery(req.query,results);
    }
      res.json(results);
  });
router.get('/api/notes/:id',(req,res)=> {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result);
      }else {
      res.status(404).send('Sorry can not find that page');
    }
  });
  router.delete('/api/notes/:id',(req,res)=> {
    const result = findById(req.params.id, db);
    if (result) {
      const notes = deleteNotes(req.body, notes);
            res.json(notes);
    res.json(result);
      }else {
      res.status(404).send('Sorry can not find that page');
    }
  });
       router.post('/api/notes',(req, res) =>{
            //incoming post store in req.body
           req.body.id = notes.length.toString();
           const notes = createNewNotes(req.body, notes);
            res.json(notes);
        });
        module.exports = router;   
