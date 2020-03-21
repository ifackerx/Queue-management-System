const express = require('express');
const app = express();
const port = 3000;
const dbConnection = require('./db/Connection')

dbConnection();
app.use(express.json({extended:false}))

app.use('/sentwork', require('./service/service'))

app.listen(port, () => {
    console.log("Server start at Port " + port);
})