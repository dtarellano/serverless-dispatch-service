const faker = require('faker');
const sqs = require('./sqsCreation.js').sqs;

const createLocation = () => {
	const minLog = -122.512539;
	const minLat = 37.709636;
	const lat = (minLat + Math.random() / 8).toPrecision(8);
	const log = (minLog + Math.random() / 10).toPrecision(9);
	return `POINT(${log} ${lat})`;
};

const newDriver = () => {
	let newDrivers = [];
	const driverCreator = () => {
		let driver = {
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			joined: new Date(),
			location: createLocation()
		};
		return driver;
	};
	for (let i = 0; i < 100; i++) {
		newDrivers.push(driverCreator());
	}
	const params = {
		QueueUrl: `${process.env.SQS_INVENTORY}rideshare-new-driver`,
		MessageBody: JSON.stringify(newDrivers)
	};
	sqs.sendMessage(params, (err, data) => {
		if (err) {
			console.log('Error: ', err);
		}
	});
};

module.exports.newDriver = newDriver;
