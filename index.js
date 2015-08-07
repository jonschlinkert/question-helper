/*!
 * question-helper <https://github.com/doowb/question-helper>
 *
 * Copyright (c) 2014-2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
var inquirer = lazy('inquirer');
var extend = lazy('extend-shallow');
var get = lazy('get-value');

module.exports = function questionHelper(key, opts, cb) {
  if (typeof key === 'function') {
    cb = key;
    opts = {};
    key = null;
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (typeof key !== 'string') {
    var arg = JSON.stringify(key);
    return cb(new Error('question helper expects the first argument to be a string, but got: ' + arg));
  }

  if (typeof opts === 'string') {
    var str = opts;
    opts = {};
    opts[key] = str;
  }


  var context = (this && this.context) || {};
  opts = opts || {};

  var questions = extend()({}, context.questions, opts);
  var question = get()(questions, key) || key;

  var result = typeof question === 'string'
    ? {name: key, message: question}
    : question;

  inquirer().prompt([result], function (answers) {
    return cb(null, answers[key]);
  });
};
