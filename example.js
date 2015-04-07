var chalk = require('chalk');
var question = require('./');

question('What\'s your name?', function (err, answer) {
  console.log(chalk.green('Hi %s!'), answer);
});
