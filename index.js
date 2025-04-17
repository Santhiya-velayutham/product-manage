// index.js
const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
require('./Database/dbConfig');

const PORT = process.env.PORT || 8080;

HTTP_SERVER.use(express.json());
HTTP_SERVER.use(express.urlencoded({ extended: false }));
HTTP_SERVER.use(cors());

// ✅ Mount app directly
HTTP_SERVER.use(require('./app'));

HTTP_SERVER.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
