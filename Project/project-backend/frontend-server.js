const express = require('express');
const path = require('path');

const PORT = 5000
const app = express();

app.use(express.static(path.join(__dirname, '..', 'project-frontend', 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'project-frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
