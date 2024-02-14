const express =require('express')
const app = express()
const bodyparser= require('body-parser')
const cors = require('cors')
let PORT = process.env.port || 8000
const mysql= require('mysql2')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "safik",
    database: "crud_apk"
})

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))


app.get('/api/get',(req, resp)=>{
    const getQuery= "SELECT * FROM contact_db"
    db.query(getQuery, (err, result)=>{
        if(err){
            console.log("errror /api/get :", err)
        }
        // console.log("Successful :", result)
        resp.send(result)    
    })
})
app.get('/',(req, resp)=>{
    // const postQuery= "INSERT INTO contact_db (name, email, contact) VALUES ('Rijuan', 'Rijuan@gmail.com', 8847808984)"
    // db.query(postQuery, (err, res)=>{
    //     console.log("errror :", err)
    //     console.log("Successful :", res)
    // })
    resp.send("hello world")
})
app.post('/api/post',(req, resp)=>{
    const {name, email, contact}= req.body ;
    const postQuery= "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
    db.query(postQuery,[name, email,contact] , (err, result)=>{
        if(err){
            console.log("errror :", err)
        }
        // console.log("Successful :", result)
        resp.send(result)    
    })
})
app.delete('/api/remove/:id',(req, resp)=>{
    const { id }= req.params;
    const removeQuery= "DELETE FROM contact_db WHERE id= ? ";
    db.query(removeQuery, id , (err, result)=>{
        if(err){
            console.log("errror delete :", err)
        }
        // console.log("Successful :", result)
        resp.send(result)    
    })
})
app.get('/api/get/:id',(req, resp)=>{
    const { id }= req.params;
    const getQuery= "SELECT * FROM contact_db WHERE id= ?"
    db.query(getQuery,id, (err, result)=>{
        if(err){
            console.log("errrorGet id :", err)
        }
        resp.send(result)    
    })
})
app.put('/api/update/:id',(req, resp)=>{
    const { id }= req.params;
    const {name, email, contact} =req.body;
    console.log( 'value:',   name, email, contact)
    const updateQuery= "UPDATE contact_db SET name = ?, email = ?, contact = ? where id= ?"
    db.query(updateQuery,[name, email, contact, id], (err, result)=>{
        if(err){
            console.log("errrorfghj :", err)
        }
        console.log(result)
        resp.send(result)    
    })
})




app.listen(PORT, ()=>{
    console.log("server started at port:  ", PORT)
})