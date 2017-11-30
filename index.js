'use strict';

/**
 * Initialize a new `Stack`
 */

module.exports = class Stack extends Array {
  get prev() {
    return this[this.length - 1];
  }

  get firstChild() {
    return this.prev ? this.prev.firstChild : null;
  }

  get lastChild() {
    return this.prev ? this.prev.lastChild : null;
  }
};
