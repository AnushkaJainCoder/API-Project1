const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")
const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}));

app.get('/users',(req,res)=>{
    const html = `
        <ul>
            ${users.map(user =>
                `<li> ${user.first_name}</li>`
            ).join("")}
        </ul>
       
    `;
    res.send(html);
})

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).put((req,res)=>{
    const id = req.params.id;
    return res.json({status: "pending"});
}).delete((req,res)=>{
    const id = req.params.id;
    return res.json({status: "pending"});
})

// app.get("/api/users/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })

app.post("/api/users",(req,res)=>{
    //to do 
    const body = req.body;
    users.push({...body, id: users.length+1});
    console.log(body);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status: "success", id: users.length});
    });
   
})




app.listen(port,()=>console.log(`server started at ${port}`));
