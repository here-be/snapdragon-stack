'use strict';

require('mocha');
const assert = require('assert');
const Stack = require('..');
let stack;
let lexer;
let node;

class Token {
  constructor(tok, match) {
    this.define('match', match);
    this.define('position', {start: 1, end: 2});
    this.type = tok.type;
    this.value = tok.value;
  }
  get range() {
    return [this.position.start, this.position.end];
  }
  define(key, value) {
    Object.defineProperty(this, key, { value: value });
    return this;
  }
}

class Node {
  constructor(node, parent) {
    this.define('parent', parent);
    this.define('isNode', true);
    this.type = node.type;
    if (node.value) this.value = node.value;
    if (node.nodes) {
      this.nodes = node.nodes.map(n => new Node(n, this));
    }
  }
  define(key, value) {
    Object.defineProperty(this, key, { value: value });
    return this;
  }
  get siblings() {
    return this.parent ? this.parent.nodes : null;
  }
  get first() {
    if (this.nodes && this.nodes.length) {
      return this.nodes[0];
    }
  }
  get last() {
    if (this.nodes && this.nodes.length) {
      return this.nodes[this.nodes.length - 1];
    }
  }
}

// mock Lexer
class Lexer {
  constructor() {
    this.isLexer = true;
    this.tokens = [];
  }
  token(tok, match) {
    return new Token(tok, match);
  }
  push(tok) {
    const token = this.token(tok);
    this.tokens.push(token);
    return token;
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
          { type: 'brace.close', value: '{' }
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

    it('should get the first child from the node.nodes array', function() {
      assert.equal(stack.firstChild(), node.nodes[0]);
    });

    it('should get the last child from the node.nodes array', function() {
      assert.equal(stack.lastChild(), node.nodes[node.nodes.length - 1]);
    });
  });
});
