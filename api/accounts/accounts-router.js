const express = require("express");

const db = require("../../data/dbConfig.js");
const { validateId, validateAccount } = require("../middleware/middleware");

const router = express.Router();

// endpoints

router.get("/", (req, res) => {
	db("accounts")
		.then((accounts) => res.status(200).json(accounts))
		.catch((error) =>
			res.status(500).json({ message: "Error retrieving accounts", error })
		);
});

router.get("/:id", validateId(db, "accounts"), (req, res) => {
	res.status(200).json(req.response);
});

router.post("/", validateAccount, (req, res) => {
	const newAccount = req.body;

	db("accounts")
		.insert(newAccount)
		.then((account) => res.status(201).json(account))
		.catch((error) =>
			res.status(500).json({ message: "Error creating new account", error })
		);
});

router.put("/:id", validateId(db, "accounts"), validateAccount, (req, res) => {
	const { id } = req.params;
	const updatedAccount = req.body;

	db("accounts")
		.where({ id })
		.update(updatedAccount)
		.then((count) => {
			count
				? res.status(200).json({ updated: count })
				: res.status(404).json({ message: "Invalid Id" });
		})
		.catch((error) =>
			res
				.status(500)
				.json({ message: `Error updating account with id ${id}`, error })
		);
});

module.exports = router;
