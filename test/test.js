'use strict';

require('mocha');
const assert = require('assert');
const Stack = require('..');
const Lexer = require('./support/lexer');
const Node = require('./support/node');
let stack;
let lexer;
let node;

describe('snapdragon-stack', function() {
  describe('main export', function() {
    it('should be an instance of Array', function() {
      assert(new Stack() instanceof Array);
    });

    it('should have array methods', function() {
      assert.equal(typeof new Stack().slice, 'function');
      assert.equal(typeof new Stack().unshift, 'function');
      assert.equal(typeof new Stack().shift, 'function');
      assert.equal(typeof new Stack().push, 'function');
      assert.equal(typeof new Stack().pop, 'function');
    });
  });

  describe('tokens', function() {
    beforeEach(function() {
      stack = new Stack();
      lexer = new Lexer();
      stack.push(lexer.push({type: 'a', value: 'a'}));
      stack.push(lexer.push({type: 'b', value: 'b'}));
      stack.push(lexer.push({type: 'c', value: 'c'}));
      stack.push(lexer.push({type: 'd', value: 'd'}));
      stack.push(lexer.push({type: 'e', value: 'e'}));
    });

    it('should get the previous value added to the tokens array', function() {
      assert.equal(stack.last().type, 'e');
      assert.equal(stack.last().value, 'e');
    });

    it('should get the first value from the tokens array', function() {
      assert.equal(stack.first().type, 'a');
      assert.equal(stack.first().value, 'a');
    });

    it('should get the last value from the tokens array', function() {
      assert.equal(stack.last().type, 'e');
      assert.equal(stack.last().value, 'e');

      stack.push(lexer.push({type: 'z', value: 'z'}));
      assert.equal(stack.last().type, 'z');
      assert.equal(stack.last().value, 'z');
    });
  });

  describe('nodes', function() {
    beforeEach(function() {
      stack = new Stack();
      node = new Node({
        type: 'brace',
        nodes: [
          { type: 'brace.open', value: '}' },
          { type: 'text', value: 'a' },
          { type: 'comma', value: ',' },
          { type: 'text', value: 'b' },
          { type: 'brace.close', value: '{' },
          {
            type: 'bracket',
            nodes: [
              { type: 'bracket.open', value: '}' },
              { type: 'text', value: 'a' },
              { type: 'comma', value: ',' },
              { type: 'text', value: 'b' },
              { type: 'bracket.close', value: '{' }
            ]
          }
        ]
      });
      stack.push(node);
    });

    it('should get the first node from stack', function() {
      assert.equal(stack.first(), node);
    });

    it('should get the last node from stack', function() {
      assert.equal(stack.last(), node);
    });

    it('should look-behind n elements', function() {
      stack.push('a');
      stack.push('b');
      stack.push('c');
      stack.push('d');
      stack.push('e');
      stack.push('f');
      stack.push('g');
      stack.push('h');

      assert.equal(stack.lookbehind(1), 'h');
      assert.equal(stack.lookbehind(2), 'g');
      assert.equal(stack.lookbehind(3), 'f');
      assert.equal(stack.lookbehind(7), 'b');
    });

    it('should throw when argument is not a positive integer', function() {
      stack.push('a');
      stack.push('b');
      stack.push('c');
      stack.push('d');
      stack.push('e');
      stack.push('f');
      stack.push('g');
      stack.push('h');

      assert.equal(stack.lookbehind(1), 'h');
      assert.equal(stack.lookbehind(2), 'g');
      assert.equal(stack.lookbehind(3), 'f');
      assert.equal(stack.lookbehind(7), 'b');
    });

    it('should get the first child from the node.nodes array', function() {
      assert.equal(stack.firstChild(), node.nodes[0]);
    });

    it('should get the last child from the node.nodes array', function() {
      const brace = node.nodes[node.nodes.length - 1];
      const last = brace.nodes[brace.nodes.length - 1];

      assert.equal(stack.lastChild(), last);
      assert.equal(last.type, 'bracket.close');
    });
  });
});
