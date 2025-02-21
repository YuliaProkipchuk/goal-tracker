
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
const planRoutes = require('./routes/plan')
const todoRoutes = require('./routes/todo');
const notesRoutes = require('./routes/notes')
const profileRoutes = require('./routes/profile');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

connectDB()

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,    
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.static('public'))

app.use('/auth', userRoutes)
app.use('/goals/:id/plan', planRoutes)
app.use('/notes', notesRoutes) 
app.use('/goals', goalRoutes)
app.use('/profile', profileRoutes)
app.use('/todo', todoRoutes)

app.get('*', (req, res, next) => {
  next({status:404,  message: 'Page not found' })
})
app.use(errorHandler)

app.listen(8080) 