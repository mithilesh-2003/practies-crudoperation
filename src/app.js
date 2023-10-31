const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

//connectivity of database
const app=express();

mongoose.connect('mongodb://127.0.0.1:27017/Loginform',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
console.log(
    "connect to Mongodb"
)
})
.catch((err)=>
{
console.error('Error',err)
});


//insert data
const User = mongoose.model('student',{
    name:String,
    email:String,
    technology:String,
    
})

app.use(bodyParser.urlencoded({
    extended:true
}));


//gettinhg form
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login-form.html');
});


//saved data or create collection
app.post('/submit',(req,res)=>{
    const{name,email,technology}=req.body;

    const user = new User({
        name,email,technology
    });

    user.save().then(()=>{
        res.send('user data is saved');
    })
    .catch((err)=>{
        console.error('Error saving user',err);
        res.status(500).send('Error saving user');
    });

});

app.get('/users', (req, res) => {
    User.find({})
      .then(students => {
        // Generate an HTML table from the user data
        const table = `
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Technology</th>
            </tr>
            ${users.map(user => `
              <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.technology}</td>
              </tr>`).join('')}
          </table>
        `;
        res.send(table);
      })
      .catch(err => {
        console.error('Error fetching users: ', err);
        res.status(500).send('Error fetching users');
      });
  });

//port represent
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});