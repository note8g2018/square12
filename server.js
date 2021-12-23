if(process.env.NODE_ENV !== 'production')
{
  require('dotenv').config({path: '.env'});
}

const express       = require('express');
const start         = require('./routes/AllRoutes');
const connectDB     = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

start(app);

const server = app.listen(PORT,
    console.log(`The server is running on Port ${PORT} at http://localhost:${PORT}`));

process.on('unhandledRejection', (err) => {
    console.log(`Logged Error: ${err}`);
    server.close(()=> process.exit(1));
});
