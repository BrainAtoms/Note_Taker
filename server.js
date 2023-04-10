const path = require("path");
const express = require("express");
const fs = require("fs");
const uuid = require("./public/helpers/uuid.js")
// const api = require('../routes/index.js');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

app.post("/api/notes", (req, res) => {
  try {
    const newNote = req.body;
    newNote.id = uuid()
    console.log(newNote)
    const fileName = path.resolve(__dirname, "db/db.json");
    const currentNotes = JSON.parse(fs.readFileSync(fileName, "utf8"));
    currentNotes.push(newNote);
    fs.writeFile(fileName, JSON.stringify(currentNotes), (err) => {
      if (err) {
        console.log(err, "error");
      } else {
        res.send(newNote);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// res.status(200).sendFile(…)
