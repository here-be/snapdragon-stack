'use strict';

/**
 * Initialize a new `Stack`
 */

module.exports = class Stack extends Array {
  get first() {
    return this[0];
  }

  get last() {
    return this[this.length - 1];
  }

  get current() {
    return this.last;
  }

  get prev() {
    return this[this.length - 2];
  }

  get firstChild() {
    if (isObject(this.first) && Array.isArray(this.first.nodes)) {
      return this.first.nodes[0];
    }
  }

  get lastChild() {
    if (isObject(this.last) && Array.isArray(this.last.nodes)) {
      return this.last.nodes[this.last.nodes.length - 1];
    }
  }
};

function isObject(val) {
  return val && typeof val === 'object';
}
