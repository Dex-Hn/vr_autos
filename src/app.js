const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

// Models
const Clients = require('./models/clients');

// Database
const db = require('./configuration/db')
db.authenticate().then(async() => {
    console.log('Database connected');
    await Clients.sync().then(() => {
        console.log('Clients table created');
    })
})
.catch((error) => {
    console.log(error);
})

const app = express();
app.set('port', process.env.port || 8010);
app.use(morgan('dev'));
app.use(express.json());

//Routes

app.use('/api/clients', require('./routes/route_clients.js'));

//Port
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});