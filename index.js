const express = require('express');
require('dotenv').config();

const app = express();

var cors = require('cors');
app.use(cors());

require('./src/routes/metrics.routes')(app);

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg": "Hello from metrics Services"});
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Onboard services listening to port ${PORT}.`)
})