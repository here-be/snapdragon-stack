
module.exports = class Node {
  constructor(node, parent) {
    this.define('parent', parent);
    this.define('isNode', true);
    this.type = node.type;
    if (node.value) this.value = node.value;
    if (node.nodes) {
      this.nodes = node.nodes.map(n => new this.constructor(n, this));
    }
  }
  define(key, value) {
    Reflect.defineProperty(this, key, { value: value });
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
    let node = this;
    while (node && Array.isArray(node.nodes) && node.nodes.length) {
      node = node.nodes[node.nodes.length - 1];
    }
    return node;
  }
};
