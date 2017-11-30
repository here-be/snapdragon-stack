'use strict';

require('mocha');
const assert = require('assert');
const Node = require('snapdragon-node');
const Token = require('snapdragon-token');
const Stack = require('..');
let stack;
let lexer;

// mock Lexer
class Lexer {
  constructor() {
    this.isLexer = true;
    this.tokens = [];
  }
  token(tok) {
    return new Token(tok, this);
  }
  push(tok) {
    const token = this.token(tok);
    this.tokens.push(token);
    return token;
  }
  pop(tok) {
    return this.tokens.pop();
  }
}

describe('snapdragon-stack', function() {
  describe('main export', function() {
    it('should be an instance of Array', function() {
      assert(new Stack() instanceof Array);
    });
  });

  describe('tokens', function() {
    beforeEach(function() {
      stack = new Stack();
      lexer = new Lexer();
      stack.push(lexer.push({type: 'a', val: 'a'}));
      stack.push(lexer.push({type: 'b', val: 'b'}));
      stack.push(lexer.push({type: 'c', val: 'c'}));
      stack.push(lexer.push({type: 'd', val: 'd'}));
      stack.push(lexer.push({type: 'e', val: 'e'}));
    });

    it('should get the previous value added to the tokens array', function() {
      assert.equal(stack.prev.type, 'e');
      assert.equal(stack.prev.val, 'e');
    });

    it('should get the first value from the tokens array', function() {
      assert.equal(stack.first.type, 'a');
      assert.equal(stack.first.val, 'a');
    });

    it('should get the lats value from the tokens array', function() {
      assert.equal(stack.last.type, 'e');
      assert.equal(stack.last.val, 'e');

      stack.push(lexer.push({type: 'z', val: 'z'}));
      assert.equal(stack.last.type, 'z');
      assert.equal(stack.last.val, 'z');
    });
  });

  describe('nodes', function() {
    beforeEach(function() {
      stack = new Stack();
      node = new Node({
        type: 'brace'
        nodes: [
          { type: 'brace.open', val: '}' },
          { type: 'text', val: 'a' },
          { type: 'comma', val: ',' },
          { type: 'text', val: 'b' },
          { type: 'brace.close', val: '{' }
        ]
      });
    });

    it('should get the first node from the node.nodes array', function() {

    });
  });
});
