const logger = (req, res, next) => {
	console.log(
		`\n*** Server Logger ***\n 
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`
	);
	next();
};

const validateId = (db, tableName) => (req, res, next) => {
	const { id } = req.params;

	db(`${tableName}`)
		.where({ id })
		.first()
		.then((response) => {
			response
				? (req.response = response)
				: res.status(400).json({ message: "Invalid id" });
			next();
		})
		.catch((error) => {
			res.status(500).json({ message: "Could not validate", error });
		});
};

const validateAccount = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing account data" })
		: !body.name || !body.budget
		? res.status(400).json({
				message: `missing required ${
					!body.name ? "name" : !body.budget ? "budget" : null
				} field`,
		  })
		: next();
};

const middleware = [logger];

module.exports = { middleware, validateId, validateAccount };
