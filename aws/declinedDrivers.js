const sqs = require('./sqsCreation.js').sqs;

const sendDeclinedDrivers = (drivers, driver) => {
	const declinedDrivers = [];
	for (let i = 0; i < drivers.length; i++) {
		if (drivers[i] !== driver) {
			declinedDrivers.push({
				driver_id: drivers[i].driver_id,
				location: drivers[i].driver_loc,
				available: false
			});
		}
	}

	const params = {
		QueueUrl: `${process.env.SQS_INVENTORY}rideshare-complete-driver`,
		MessageBody: JSON.stringify(declinedDrivers)
	};
	console.log(params);
	sqs.sendMessage(params, (err, data) => {
		if (err) {
			console.log('Error', err);
		}
	});
};

module.exports.sendDeclinedDrivers = sendDeclinedDrivers;
module.exports.sendDeclinedDrivers = sendDeclinedDrivers;
