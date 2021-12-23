const mongoose      = require('mongoose');

const MongoURI = process.env.DATABASE_URL;

async function connectDB()
{
    const adminDB =  mongoose.connect(MongoURI, {   
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
        //useFindAndModify: true,
        dbName: "compose"
});
    //const composeDB  = await adminDB.useDb("compose");
    //await adminDB.db({dbName: "compose"});
    //useDb('compose');
    //connectDB.useDb('compose');
    //console.log(`${await adminDB.users}`);
    
    console.log('MongoDB is connected to compose');
}

module.exports = connectDB;