const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const port = 4000
const roommateRoutes = require('./routes/roomRoutes');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to mongodb database
require('./database')();

app.use('/api', roommateRoutes.routes);
app.use('/api/v1.0/auth', authRoutes.routes);

app.get("/", (req, res) => {
    res.send({ message: "Welcome" })
});


// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use("*", (req, res) => {
    res.status(404).send({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });
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