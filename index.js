require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello Developer, Backend is Running ✅");
  });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
