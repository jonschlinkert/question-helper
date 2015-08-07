var green = require('ansi-green');
var question = require('./');

question('What\'s your name?', function (err, answer) {
  console.log(green('Hi %s!'), answer);
});
