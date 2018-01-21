'use strict';

/**
 * Initialize a new `Stack`
 */

module.exports = class Stack extends Array {

  /**
   * Get the first element in the stack.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * stack.push('a');
   * stack.push('b');
   * stack.push('c');
   * console.log(stack.first()); //=> 'a'
   * ```
   * @name .first
   * @return {any}
   * @api public
   */

  first() {
    return this[0];
  }

  /**
   * Get the last element in the stack.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * stack.push('a');
   * stack.push('b');
   * stack.push('c');
   * console.log(stack.last()); //=> 'c'
   * ```
   * @name .last
   * @return {any}
   * @api public
   */

  last() {
    return this[this.length - 1];
  }

  /**
   * Get the second-to-last item in the stack.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * stack.push('a');
   * stack.push('b');
   * stack.push('c');
   * console.log(stack.prev()); //=> 'b'
   * ```
   * @name .prev
   * @return {any}
   * @api public
   */

  prev() {
    return this[this.length - 2];
  }

  /**
   * If the [.first](#first) element in the stack is an object with a `.nodes`
   * array, the first item from `stack.first().nodes` is returned.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * const Node = require('snapdragon-node');
   *
   * const node = new Node({ type: 'brace' });
   * node.push(new Node({ type: 'brace.open', value: '{' }));
   * node.push(new Node({ type: 'text', value: 'a,b,c' }));
   * node.push(new Node({ type: 'brace.close', value: '}' }));
   *
   * stack.push(node);
   * console.log(stack.firstChild()); //=> Node { type: 'brace.open', value: '{' }
   * ```
   * @name .firstChild
   * @return {any}
   * @api public
   */

  firstChild() {
    const ele = this.first();
    if (isObject(ele) && Array.isArray(ele.nodes)) {
      return ele.nodes[0];
    }
  }

  /**
   * If the [.last](#last) element in the stack is an object with a `.nodes`
   * array, the last item from `last.nodes` is returned.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * const Node = require('snapdragon-node');
   *
   * const node = new Node({ type: 'brace' });
   * node.push(new Node({ type: 'brace.open', value: '{' }));
   * node.push(new Node({ type: 'text', value: 'a,b,c' }));
   * node.push(new Node({ type: 'brace.close', value: '}' }));
   *
   * stack.push(node);
   * console.log(stack.lastChild()); //=> Node { type: 'brace.close', value: '}' }
   * ```
   * @name .lastChild
   * @return {any}
   * @api public
   */

  lastChild() {
    let ele = this.last();
    while (isObject(ele) && Array.isArray(ele.nodes) && ele.nodes.length) {
      ele = ele.nodes[ele.nodes.length - 1];
    }
    return ele;
  }
};

function isObject(val) {
  return val && typeof val === 'object';
}
