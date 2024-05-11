
const express = require('express');
const path = require('path');
const app = express();
require("dotenv").config();

const PORT = process.env.REACT_SERVER_PORT || 6003;
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});
