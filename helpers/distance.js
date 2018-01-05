const geodist = require('geodist');

const getWaitEstimate = (driver, riderLoc) => {
	const filterDriver = driver.driver_loc.split(/[POINT()]/g)[6].split(' ');
	const filterRider = riderLoc.split(/[POINT()]/g)[6].split(' ');

	const driverLocation = {
		lat: Number(filterDriver[1]),
		lon: Number(filterDriver[0])
	};
	const riderLocation = {
		lat: Number(filterRider[1]),
		lon: Number(filterRider[0])
	};
	const miles = geodist(driverLocation, riderLocation, {
		exact: true,
		unit: 'miles'
	});

	return Math.floor(miles / 20 * 60);
};

module.exports.getWaitEstimate = getWaitEstimate;
