require('dotenv').config({path:"./config/.env"});
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoAtlasUri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');
//***************Setting up Mongoose:
const connectDB = async () => {
try {
  // Connect to the MongoDB Atlas cluster
    await mongoose.connect(mongoAtlasUri)
    console.log(" Mongoose is connected")
} catch (e) {
  console.log("Could not connect",e);
}
}
connectDB()
// Express server
app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});

// async function addUser () {
//     try {
//         const user = await User.create({
//             firstname : "Ahmed",
//             lastname : "Hassiki",
//             email : "gomycode@gmail.com",
//             address : "Nabeul"
//         })
//         const data = await user.save()
//         console.log(user)
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// addUser()




// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});