const express = require('express');
const cors = require('cors');
const app = express();
const port = 8181;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./database/db')

app.post("/posttodo",(req,res)=>{
   console.log(req.body);
    try 
    {
        const { taskname, priority, desc } = req.body;
        const stmt = db.prepare('INSERT INTO todo (taskname, priority) VALUES(?,?)');
        const result = stmt.run(taskname, priority  );
        res.json({id: result.lastInsertRowid,taskname, priority});  
    }
    catch(e){
        console.log(e);
        res.status(400).json({error:e.message});

    }
});

app.put("/updatetodo",(req,res)=>{
   console.log(req.body);
    try 
    {
        const { taskname, priority, desc, id } = req.body;
        const stmt = db.prepare('UPDATE todo SET taskname = ? , priority = ? WHERE id = ?');
        const result = stmt.run(taskname, priority, desc , iscompleted, id);
        res.json({id: result.lastInsertRowid,taskname, priority}); 
         
    }
    catch(e){
        console.log(e);
        res.status(400).json({error:e.message});

    }
});

app.delete('/deletetodo',(req,res,next)=>{
    try {
       const stmt = db.prepare('DELETE from todo  WHERE id = ?');
       stmt.run(req.body.id);
       res.send(`${req.body.id} has been deleted successfully`).status(200);
       console.log("it got deleted"+req.body.id);
    }
    catch(e)
    {
        res.status(500).json({error:e.message});
    }
})

app.get('/getlist',(req,res)=>{
   const todo = db.prepare('SELECT * from todo').all();
   res.json(todo);

});
app.listen(port,()=>{console.log(`server is listening on ${port}`)});