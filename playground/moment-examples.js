var moment = require('moment');

console.log(moment().format());

var now = moment();

console.log("Current timestamp", now.unix());

var timestamp = 1490640697;
var currentMoment = moment.unix(timestamp);

console.log(currentMoment.format('MMM dddd d'));
console.log(currentMoment.format('MMMM do, YYYY @ h:mm A'));
