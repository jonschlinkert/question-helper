'use strict';

var assert = require('assert');
var should = require('should');
var Template = require('template');
var question = require('./');

var timeout = 5000;
var context = {
  questions: {
    name: 'What\'s your name?',
    dob: 'When\'s your birtday?',
    author: {
      name: 'Author name?'
    }
  }
};

describe('questions', function () {
  it('should return an answer given a question', function (cb) {
    this.timeout(timeout);
    question('What\'s your name?', function (err, answer) {
      answer.should.be.a.string;
      cb();
    });
  });

  it('should return an answer given a question key', function (cb) {
    this.timeout(timeout);
    question.call({context: context}, 'name', function (err, answer) {
      answer.should.be.a.string;
      cb();
    });
  });

  it('should ask questions from nested properties', function (cb) {
    this.timeout(timeout);
    question.call({context: context}, 'author.name', function (err, answer) {
      answer.should.be.a.string;
      cb();
    });
  });

  it('should throw an error when a key is not passed in', function (cb) {
    this.timeout(timeout);
    question(function (err, answer) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });
  it('should throw an error when a key is not a string', function (cb) {
    this.timeout(timeout);
    question({}, function (err, answer) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });
});

describe('as a handlebars helper', function () {
  var template = null;
  beforeEach(function () {
    template = new Template();
    template.engine('hbs', require('engine-handlebars'));
    template.page('test-question.hbs', 'Your name is {{question "What\'s your name?"}}');
    template.page('test-key.hbs', 'Your name is {{question "name"}}');
    template.asyncHelper('question', question);
  });
  it('should return an answer given a question', function (cb) {
    this.timeout(timeout);

    template.render('test-question.hbs', function (err, content) {
      if (err) console.log('err', err);
      content.should.exist;
      assert(content.indexOf('{{') === -1)
      cb();
    });
  });
  it('should return an answer given a question key', function (cb) {
    this.timeout(timeout);
    template.render('test-key.hbs', context, function (err, content) {
      if (err) console.log('err', err);
      assert(content.indexOf('{{') === -1)
      cb();
    });
  });
  it('should throw an error when a key is not passed in', function (cb) {
    this.timeout(timeout);
    template.render('', context, function (err, content) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });
  it('should throw an error when a key is not a string', function (cb) {
    this.timeout(timeout);
    template.render('test-bad-key.hbs', context, function (err, content) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });
});

describe('lodash helper', function () {
  var template = null;
  beforeEach(function () {
    template = new Template();
    template.engine('html', require('engine-lodash'));
    template.page('test-question.html', 'Your name is <%= question("What\'s your name?") %>');
    template.page('test-key.html', 'Your name is <%= question("name") %>');
    template.page('test-no-key.html', 'Your name is <%= question() %>');
    template.asyncHelper('question', question);
  });

  it('should return an answer given a question', function (cb) {
    this.timeout(timeout);
    template.render('test-question.html', function (err, content) {
      if (err) console.log('err', err);
      content.should.exist;
      assert(content.indexOf('<%=') === -1);
      cb();
    });
  });

  it('should return an answer given a question key', function (cb) {
    this.timeout(timeout);
    template.render('test-key.html', context, function (err, content) {
      if (err) console.log('err', err);
      assert(content.indexOf('<%=') === -1);
      cb();
    });
  });

  it('should throw an error when a key is not passed in', function (cb) {
    this.timeout(timeout);
    template.render('', context, function (err, content) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });

  it('should throw an error when a key is not a string', function (cb) {
    this.timeout(timeout);
    template.render('test-bad-key.html', context, function (err, content) {
      err.should.be.an.object;
      err.should.have.property('message');
      cb();
    });
  });
});
