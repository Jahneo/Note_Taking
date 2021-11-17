const router = require("express").Router();
const {
    findById,
    filterByQuery,
    createNewNotes,
} = require('../server.js');
router.get('/api.db',(req,res)=> {
    let results = db;
    if(req.query){
      results = filterByQuery(req.query,results);
    }
      res.json(results);
  });
router.get('/api/db/:id',(req,res)=> {
    const result = findById(req.params.id, db);
    if (result) {
    res.json(result);
      }else {
      res.status(404).send('Sorry can not find that page');
    }
  });
    
       router.post('/api/db',(req, res) =>{
            //incoming post store in req.body
           req.body.id = db.length.toString();
           const notes = createNewNotes(req.body, db);
            res.json(notes);
        });
        module.exports = router;   
