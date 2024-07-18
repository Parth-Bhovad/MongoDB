const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./Models/user');

app.set('view engine' , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/' , (req, res) => {
    res.render('index')
});

app.get('/read' , async (req, res) => {
   const users = await userModel.find();
    res.render('read' , {users})
});

app.get('/delete/:id' , async (req, res) => {
    const userDelete = await userModel.findOneAndDelete({ _id: req.params.id});
    console.log('working');
     res.send(userDelete);
 });

app.post('/create', async (req, res) => {
     const createdUser = await userModel.create({ 
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
      });

      res.send(createdUser)
})

app.listen(3000)