const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// endpoints

router.get("/", (req, res) => {
	db("accounts")
		.then((accounts) => res.status(200).json(accounts))
		.catch((error) =>
			res.status(500).json({ message: "Error retrieving accounts", error })
		);
});

module.exports = router;
