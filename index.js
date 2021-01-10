//npm run dev

const uri = "mongodb+srv://Alona:Alona@cluster0.zhol5.mongodb.net/todos?retryWrites=true&w=majority";


const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

// регистрируем движок
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (error) {
    console.log(error);
  }
}

start();