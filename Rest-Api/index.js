const Joi = require('joi');
const express = require('express');
const {Client} = require('pg');
const func = require('joi/lib/types/func');
const { valid } = require('joi/lib/types/lazy');
const app = express();
app.use(express.json());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "postgres"
})

client.connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers"," Content-Type, Access-Control-Allow-Headers, X-Requested-With")
    next();
  });


////////////////////////// GET ///////////////////////////////
app.get('/api/users',(req,res) =>{
    client.query(`SELECT * FROM public.users`,(err,result) => {
        if(!err){
        res.send(result.rows);
        } else if(err){
            res.send(err.message);
        }
    });
});
app.get('/api/users/:data',(req,res) =>{
    
    client.query(`SELECT * from public.users WHERE data = ${req.params.data}`,(err,result) => {
        if(!err){
            res.send(result.rows);
        } else if (err){
            res.send(err.message);
        }  
    })
});

app.get('/api/sum',(req,res) => {
    client.query(`SELECT SUM(data) from public.users`, (err,result) => {
        if(!err){
            res.send(result.rows);
        } else if(err){
            res.send(err.message);
        }
    })
});

////////////////////////// POST ///////////////////////////////
app.post('/api/users',(req,res) => {

    const result = validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const user = {
        data: req.body.data
    };
    let insertQuery = `INSERT INTO public.users(
       data)
        VALUES (${user.data});`

    client.query(insertQuery,(err,result) => {
        if(!err){
            res.send("Insertion succesfull");
        } else{ console.log(err.message);}
    })
    
});


////////////////////////// UPDATE ///////////////////////////////
app.put('/api/users/:data', (req,res) => {

    
    const result = validate(req.body);
    console.log(result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let updateQuery = `UPDATE public.users
    SET data = ${req.body.data}
    WHERE data=${req.params.data} and id in (SELECT id FROM public.users WHERE data = ${req.params.data} LIMIT 1);`
    client.query(updateQuery,(err, result) => {
        if(!err){
            res.send('Update succesfull! ');
        }else{
            res.send(err.message);
        }
    })

});
app.delete('/api/users/deleteall', (req,res) => {
    let deleteAll = `DELETE FROM public.users;`
    client.query(deleteAll, (err, result) => {
        if(!err){
            res.send('All deleted');
        }else{
            res.send(err.message);
        }
    })
})
app.delete('/api/users/:data', (req,res) => {
    
    let deleteQuery = `DELETE FROM public.users
    WHERE data=${req.params.data} and id in (SELECT id FROM public.users WHERE data = ${req.params.data} LIMIT 1);`
    client.query(deleteQuery, (err,result) => {
        if(!err){
            res.send('Delete succesfull');
        } else{
            res.send(err.message);
        }
    })

})



function validate(user){
    const schema = {
        data: Joi.number().required()
    };
    return Joi.validate(user,schema);
}


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening port ${port}`));
