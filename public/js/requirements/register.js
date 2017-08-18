var registerAction = require('../actions/register');

$(() => {
	$('#regButton').on('click', function () {
		registerAction();
	});
});
