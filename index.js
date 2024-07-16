const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const port = 8000;


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

app.get("/api/users/:id",(req,res)=>{

})



app.listen(port,()=>console.log(`server started at ${port}`));
