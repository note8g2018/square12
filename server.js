const express       = require('express')
const session       = require('express-session')
const MongoDBStore  = require('connect-mongodb-session')(session)
const mongoose      = require('mongoose')

const UserModel     = require('./models/User')

const MongoURI = 'mongodb://admin:159357654@192.168.43.6:27017/admin'

const app = express()
mongoose.connect(MongoURI, {   
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
    }).then((res)=>{
    console.log('MongoDB is connected to admin')
})

const store = new MongoDBStore({
    uri: MongoURI,
    databaseName: 'compose',
    collection: 'mySessions'
  });

app.use(session({
    secret: 'fuck microsoft',
    resave: false,
    saveUninitialized: false,
    store: store,
    //cookie:{secure: true}
}))



app.get('/', (req, res)=>{
    req.session.isAuth = true
    console.log(req.session)
    res.send('<h1>Hello me 1</h1>')
})

app.listen(5000, console.log('The server is running on Port 5000 at http://localhost:5000'))
