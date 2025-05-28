const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const router = require("./routes/index.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase', {})

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
