const express = require("express");
const MongoClient = require("mongodb").MongoClient;

var cors = require('cors')

    
const app = express();
const jsonParser = express.json();
app.use(cors())


  
const mongoClient = new MongoClient("mongodb://localhost:27017/");
 
app.use(express.static(__dirname + "/"));

(async () => {
    try {
       await mongoClient.connect();
       app.locals.collection = mongoClient.db("usersdb").collection("users");
       await app.listen(8000);
       console.log("Сервер ожидает подключения...");
   }catch(err) {
       return console.log(err);
   } 
})();
 
app.post("/api/users", jsonParser, async(req, res)=> {
        
    if(!req.body) return res.sendStatus(400);
        
    const CardNumber = req.body.number;
    const ExpDate = req.body.date;
    const Cvv = req.body.cvv;
    const Amount = req.body.amount;
    const user = {number: CardNumber, date: ExpDate, cvv: Cvv, amount: Amount};
        
    const collection = req.app.locals.collection;
     
    try{
        await collection.insertOne(user);
        res.send({'amount':`${user.amount}`,"_id":`${user._id}`});
    }
    catch(err){return console.log(err);}
});
 
