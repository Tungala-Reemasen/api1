const express=require('express');
const users=require('./users');
const path=require('path');
const app=express();
const idFilter = req => member => member.id === parseInt(req.params.id);
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
const PORT=3001;
app.listen(PORT, () => console.log(`Server is Running ${PORT}`))
//GET All USERS
app.get('/api/users',(req,res)=>res.json(users));
//GET Specific USER Based on ID
app.get('/api/users/:id', (req, res) => {
const found = users.some(idFilter(req));
if (found) {
res.json(users.filter(idFilter(req)));
} else {
res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
}
});
app.post('/api/users',(req,res)=>{
    const newMember={
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: 'guest'
    };
    if(!newMember.name || !newMember.email){
    return res.status(400).json({msg:'NAME and EMAIL Must be provided'});
    }
    users.push(newMember);
    res.json(users);
    }
    );
    app.delete('/api/users/:id', (req, res) => {
        const found = users.some(idFilter(req));
        if (found) {
        res.json({msg:'Deleted',
        members:users.filter(
        member=>member.id!==parseInt(req.params.id))})
        } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        }
        });
        app.put('/api/users/:id',(req,res)=>
{
const found = users.some(member=>member.id===parseInt(req.params.id));
if(found)
{
const updMember=req.body;
users.forEach(
member=>{
if(member.id===parseInt(req.params.id))
{
member.name=updMember ? updMember.name : member.name;
member.email=updMember.email ? updMember.email : member.email;
res.json({msg:'Updated Details',member})
}
}
);
}
else{
res.status(400).json({msg:'No User found with ${req.params.id}'});
}
});

        
