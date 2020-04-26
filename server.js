const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./routes/user');
const profiles = require('./routes/profile');
const bcrypt = require('bcrypt');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const secretKey = require('./config/default').secretOrKey;

app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 6010;

app.listen(port, () => console.log(`App listening on port ${port}`));
