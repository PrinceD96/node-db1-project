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

router.get("/:id", (req, res) => {
	const { id } = req.params;

	db("accounts")
		.where({ id })
		.first()
		.then((account) => {
			account
				? res.status(200).json(account)
				: res.status(404).json({ message: "Account not found" });
		})
		.catch((error) =>
			res
				.status(500)
				.json({ message: `Error retrieving account with id ${id}`, error })
		);
});

router.post("/", (req, res) => {
	const newAccount = req.body;

	!newAccount.name || !newAccount.budget
		? res.status(400).json({
				message: `Please provide required ${
					!newAccount.name ? "name" : "budget"
				} field for the account`,
		  })
		: db("accounts")
				.insert(newAccount)
				.then((account) => res.status(200).json(account))
				.catch((error) =>
					res.status(500).json({ message: "Error creating new account", error })
				);
});

module.exports = router;
