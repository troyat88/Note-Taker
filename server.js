const express =  require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid")


var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Route for Homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//Route for NotesPage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Displays notes in sidebar 
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});


//Post new Note
app.post('/api/notes', (req, res) => {
 
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      Id: uniqid(),
    }; 
    const notesData = JSON.parse(fs.readFileSync("db/db.json"))
    notesData.push(newNote)

    fs.writeFileSync("db/db.json",JSON.stringify(notesData, null,2))

    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`))

  