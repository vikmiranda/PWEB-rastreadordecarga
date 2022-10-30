const express = require('express');
const cors = require('cors');
const axios = require('axios');
const url = require('url');
require('dotenv').config();

const PORT = process.env.PORT | 3000;

// init express
const app = express();
// enable cors
app.use(cors());

// router
// app.use('/api/search', require('./routes/searchResults'));

app.listen(PORT, () => {
    console.log(`App has strated on port: ${PORT}`);
})