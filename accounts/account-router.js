const express = require("express");

const db = require("../data/dbConfig.js");
const { restart } = require("nodemon");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ message: err.message });
    });
});

router.post("/", (req, res) => {
  const account = req.body;

  db("accounts")
    .insert(account)
    .returning("id")
    .then((ids) => {
      res.status(201).json({ message: ids });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "account updated successfully" });
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "account destroyed" });
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
