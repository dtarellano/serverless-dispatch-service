const axios = require('axios');
const newDriver = require('./aws/newDriver.js').newDriver;
const sendDeclinedDrivers = require('./aws/declinedDrivers.js')
	.sendDeclinedDrivers;
const getWaitEstimate = require('./helpers/distance.js').getWaitEstimate;
const driverSelector = require('./helpers/driverSelector.js').driverSelector;

module.exports.dispatch = (event, context, callback) => {
	const body = JSON.parse(event.body);
	const driver = driverSelector(body.drivers);
	const waitTime = getWaitEstimate(driver, body.rider_loc);
	const query = {
		ride_id: event.body.ride_id,
		driver_loc: driver.driver_loc,
		wait_time: waitTime
	};
	const response = {
		statusCode: 200,
		headers: {
			my_head: 'hi'
		},
		body: JSON.stringify('hi'),
		isBase64Encoded: false
	};
	axios
		.post(process.env.RIDER_CLIENT, { query: query })
		.then(res => {
			const response = {
				statusCode: 200,
				body: JSON.stringify({
					query: query
				})
			};
			callback(null, response);
		})
		.catch(err => {
			callback(err);
		});
	axios
		.get(`${process.env.DB_ROUTE}dispatch`, {
			data: {
				ride_id: body.ride_id,
				driver: driver,
				rider_loc: body.rider_loc,
				waitTime: waitTime
			}
		})
		.catch(err => {
			console.log('ERROR:', err);
		});
	sendDeclinedDrivers(body.drivers, driver);
	newDriver();
	callback(null, JSON.stringify(response));
};
