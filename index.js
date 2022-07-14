const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const port = 5000
const roommateRoutes = require('./routes/roomRoutes')
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to mongodb database
require('./database')();

app.use('/api', roommateRoutes.routes);

app.get("/", (req, res) => {
    res.send({ message: "Welcome" })
});


// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next()
    } else {
        if(err.message){
            res.status(500).send(err.message)
        } else {
            res.send('There was an error')
        }
    }
})