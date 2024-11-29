require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path  = require('path')

const userRoutes = require('./routes/auth');
const authToken = require('./util/verify');
const goalRoutes = require('./routes/goals');
const planRoutes = require('./routes/plan')
const todoRoutes = require('./routes/todo');
const notesRoutes = require('./routes/notes')
const User = require('./models/user');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/goalsApp');

}
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors())
app.use(express.static('public'))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'public/images')
  },
  filename:(req, file, cb)=>{
    cb(null, file.fieldname + '_'+Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({
  storage:storage
})
app.use('/auth', userRoutes)
app.use('/goals/:id/plan', planRoutes)
app.use('/goals/:id/notes', notesRoutes) 
app.use('/goals', goalRoutes)

app.use('/todo', todoRoutes)
app.get('/profile', authToken, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).populate('goals').populate('todos');
  res.json({ user })
})
app.patch('/profile',upload.single('imageFile'), authToken, async (req, res) => {
  const id = req.user.id;
  const jsonData = JSON.parse(req.body.data);
  const user = await User.findById(id);
  console.log(jsonData);
  user.username = jsonData.username;
  user.email = jsonData.email;
  user.image = req.file ? req.file.filename:user.image;
  console.log(user); 
  
  user.save();
  res.json(user)
})
app.get('*', (req, res) => {
  res.send({ message: '404 not found' })
})
app.use((err, req, res, next)=>{
  console.log('ERROR!', err);
  const status = err.status||500;
  const message = err.message||'Something went wtong'
  res.status(status).json({ message: message })
  
})
app.listen(8080)
