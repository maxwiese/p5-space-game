var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

/* GET home page. */
router.get('/', function (req, res, next) {
  let db = new sqlite3.Database('./data/score.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500);
    }
    console.log('Connected to database.');
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Scoreboard(name TEXT, score NUMBER, timestamp TEXT)`)
      .all(`SELECT * FROM Scoreboard`, (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500);
        }
        res.json(`{data: [${rows.map(row => row = JSON.stringify(row))}]}`).status(200);
      });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

router.post('/', function (req, res, next) {
  let name = req.body.name;
  let score = req.body.score;

  let db = new sqlite3.Database('./data/score.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500);
    }
    console.log('Connected to database.');
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Scoreboard(name TEXT, score NUMBER, timestamp TEXT)`)
      .run(`INSERT INTO Scoreboard(name, score, timestamp) VALUES(?, ?, ?)`, [name, score, Date.now()], (err) => {
        if (err) {
          console.error(err.message);
          res.status(500);
        }
      })
      .all(`SELECT * FROM Scoreboard`, (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500);
        }

        res.json(`{data: [${rows.map(row => row = JSON.stringify(row))}]}`).status(200);
      });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });

});

module.exports = router;
