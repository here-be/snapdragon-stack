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
   * console.log(stack.first);
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
   * console.log(stack.last);
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
   * console.log(stack.prev);
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
   * array, the first item from `first.nodes` is returned.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * console.log(stack.firstChild);
   * ```
   * @name .firstChild
   * @return {any}
   * @api public
   */

  firstChild() {
    const first = this.first();
    if (isObject(first) && Array.isArray(first.nodes)) {
      return first.nodes[0];
    }
  }

  /**
   * If the [.last](#last) element in the stack is an object with a `.nodes`
   * array, the last item from `last.nodes` is returned.
   *
   * ```js
   * const Stack = require('snapdragon-stack');
   * console.log(stack.lastChild);
   * ```
   * @name .lastChild
   * @return {any}
   * @api public
   */

  lastChild() {
    const last = this.last();
    if (isObject(last) && Array.isArray(last.nodes)) {
      return last.nodes[last.nodes.length - 1];
    }
  }
};

function isObject(val) {
  return val && typeof val === 'object';
}
