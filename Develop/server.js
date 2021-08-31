const express =  require("express");
const path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
