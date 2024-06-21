const cookieParser = require('cookie-parser');
const express  = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose-connection');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash');



app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash()); 


app.use('/',indexRouter)
app.use('/owners',ownerRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})