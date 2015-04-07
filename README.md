# question-helper [![NPM version](https://badge.fury.io/js/question-helper.svg)](http://badge.fury.io/js/question-helper)

> Template helper that asks a question in the command line and resolves the template with the answer.

Inspired by conversations with [Jon Schlinkert](https://github.com/jonschlinkert)

## Install with [npm](npmjs.org)

```bash
npm i question-helper --save
```

## Usage

```js
var question = require('question-helper');

// Prompt a user for a question and get an answer back.
question("What's your name?", function (err, answer) {
  console.log(chalk.green("Hi %s!"), answer);
});
```

**Params**

* `key` **{String}**: Either a key on a `questions` object on the context or a question to ask.    
* `options` **{String}**: Additional options to pass.    
* `callback` **{Function}**: Callback function that will be passed an error and/or the results of asking the question.    

## Examples

Pass a `questions` object, where the value of each property is a question to ask:

```js
var context = {
  questions: {
    name: 'What is your name?',
    description: 'Project description?',
    author: {
      name: 'Author name?',
      url: 'Author url?',
    }
  }
};

// Q: 'What is your name?'
question('name', context, function (err, answer) {
  if (err) console.log(err);
  // A: 'Jon'
});

// Q: 'Project description?'
question('description', context, function (err, answer) {
  if (err) console.log(err);
  // A: 'Template helper that asks a question...'
});

// Q: 'Author name?'
question('author.name', context, function (err, answer) {
  if (err) console.log(err);
  // A: 'Brian Woodward'
});
```


### Template 

To use with [template]:

```bash
npm i template --save
```

Then add to your project.

```js
var template = require('template');
```

**handebars**

Register [handlebars as an engine][engine-handlebars]:

```js
template.engine('hbs', require('engine-handlebars'));

var question = require('question-helper');
var context = {questions: {name: "What's your name?"}};

template.page('author.hbs', "Author: {{question 'name'}}");
template.render('author.hbs', context, function (err, content) {
  if (err) return console.log('error', err);
  console.log(content);
});
```

**Lo-Dash**

Register [Lo-Dash as an engine][engine-lodash]:

```js
template.engine('html', require('engine-lodash'));

var context = {questions: {name: "What's your name?"}};
template.page('author.html', "Author: <%= question('name') %>");

template.render('author.html', context, function (err, content) {
  if (err) return console.log('error', err);
  console.log(content);
});
```

## Running tests
Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/question-helper/issues)

## Related
 * [template-helpers](https://github.com/jonschlinkert/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.
 * [handlebars-helpers](https://github.com/assemble/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes helpers like {{i18}}, {{markdown}}, {{relative}}, {{extend}}, {{moment}}, and so on.
 * [template](https://github.com/jonschlinkert/template): Render templates from any engine. Make custom template types, use layouts on pages, partials or any custom template type, custom delimiters, helpers, middleware, routes, loaders, and lots more. Powers Assemble v0.6.0, Verb v0.3.0 and your application.
 * [engine-handlebars](https://github.com/jonschlinkert/engine-handlebars): Handlebars engine, consolidate.js style but with enhancements. This works with Assemble, express.js, engine-cache or any application that follows consolidate.js conventions.
 * [engine-lodash](https://github.com/jonschlinkert/engine-lodash): Lo-Dash engine, consolidate.js style but with enhancements. Works with Assemble, express.js, engine-cache or any application that follows consolidate.js conventions.

## Author

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb) 

## License
Copyright (c) 2015 Brian Woodward  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on April 07, 2015._

[engine-handlebars]: https://github.com/jonschlinkert/engine-handlebars
[engine-lodash]: https://github.com/jonschlinkert/engine-lodash
[template]: https://github.com/jonschlinkert/template
